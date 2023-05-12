import { Request, Response } from "express";
import userService from "../services/user.service";
import { MESSAGES } from "../constants";

class UserController {
  async findAll(req: Request, res: Response) {
    try {
      const users = await userService.findAll();
      res.status(200).json({ success: true, users });
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }
  async findUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await userService.findById(id);

      if (!user) throw new Error("user not found");

      return res.status(200).json({ success: true, user });
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      await userService.updateUser(id, req.body);

      return res.status(201).json({ success: true, message: MESSAGES.UPDATED });
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }

  async updatePassword(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      await userService.updatePassword(id, req.body.password);
      return res.status(201).json({ success: true, message: MESSAGES.UPDATED });
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }

  async uploadProfileImg(req: Request, res: Response) {}

  async deleteUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await userService.deleteUser(id);
      return res.status(200).json({ success: true, message: MESSAGES.DELETED });
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }
}

export default new UserController();
