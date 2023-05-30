import { ERRORS, MESSAGES } from "./../constants/index";
import { Request, Response } from "express";
import userService from "./../services/user.service";
import authService from "./../services/auth.service";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const user = await authService.login(req.body, res);

      if (user) return res.status(200).json({ success: true, ...user });
    } catch (err: any) {
      return res.status(401).json({ success: false, error: err.message });
    }
  }

  async signup(req: Request, res: Response) {
    try {
      await userService.createUser(req.body);
      res.status(201).json({ success: true, message: MESSAGES.CREATED });
    } catch (err: any) {
      return res.status(401).json({ success: false, error: err.message });
    }
  }

  async handleRefreshToken(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.jwt;
      const user: any = await jwt.verify(refreshToken, jwtConfig.REFRESH_TOKEN_SECRET);
      const accessToken = await authService.generateAccessToken({ id: user.id, email: user.email });

      res.status(200).json({ success: true, ...accessToken });
    } catch (err: any) {
      return res.status(401).json({ success: false, error: ERRORS.UNAUTHENTICATED });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      await authService.logout(res);

      return res.status(204).json({ success: true, message: "logout successful" });
    } catch (err: any) {
      return res.status(401).json({ success: false, error: ERRORS.UNAUTHENTICATED });
    }
  }
}

export default new AuthController();
