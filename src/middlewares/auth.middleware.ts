import { ERRORS } from "./../constants/index";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config";
import { RequestWithUser } from "../interfaces/request.interface";
import authService from "../services/auth.service";

export const requireAuth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader?.split(" ")[1]!;
  const refreshToken = req.cookies.jwt;

  console.log(refreshToken);

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ success: false, error: ERRORS.UNAUTHENTICATED });
  }

  try {
    const user = await jwt.verify(accessToken, jwtConfig.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (err: any) {
    if (!refreshToken) {
      return res.status(401).json({ success: false, error: ERRORS.UNAUTHENTICATED });
    }

    try {
      const user: any = jwt.verify(refreshToken, jwtConfig.REFRESH_TOKEN_SECRET);
      const accessToken = await authService.generateAccessToken({ id: user.id, email: user.email });

      await authService.setCookie(refreshToken, res);

      res.header("Authorization", accessToken.accessToken);

      req.user = user;
      next();
    } catch (err: any) {
      return res.status(401).json({ success: false, error: ERRORS.UNAUTHENTICATED });
    }
  }
};
