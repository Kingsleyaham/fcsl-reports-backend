import { ERRORS } from "./../constants/index";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config";
import { RequestWithUser } from "../interfaces/request.interface";

export const requireAuth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader?.split(" ")[1]!;

  if (!accessToken) {
    console.log("non token");
    return res.status(401).json({ success: false, error: ERRORS.UNAUTHENTICATED });
  }

  try {
    const user = await jwt.verify(accessToken, jwtConfig.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (err: any) {
    return res.status(403).json({ success: false, error: ERRORS.UNAUTHENTICATED });
  }
};
