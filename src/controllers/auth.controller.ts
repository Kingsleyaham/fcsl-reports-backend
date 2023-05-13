import { MESSAGES } from "./../constants/index";
import { Request, Response } from "express";
import userService from "./../services/user.service";
import authService from "./../services/auth.service";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const user = await authService.login(req.body, res);

      if (user) return res.status(200).json({ success: true, ...user });
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }

  async signup(req: Request, res: Response) {
    try {
      await userService.createUser(req.body);
      res.status(201).json({ success: true, message: MESSAGES.CREATED });
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }
  
  async logout() {}
}

export default new AuthController();
