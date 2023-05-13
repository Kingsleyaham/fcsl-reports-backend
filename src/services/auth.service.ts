import jwt from "jsonwebtoken";
import { ILogin } from "./../interfaces/login.interface";
import userService from "./user.service";
import { passwordCompare } from "../utils/password.util";
import { jwtConfig } from "../config";
import { Response } from "express";
interface ITokenProps {
  id: number;
  email: string;
}

class AuthService {
  async generateAccessToken(user: ITokenProps) {
    const token = jwt.sign({ ...user }, jwtConfig.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });

    return { accessToken: token };
  }

  async generateRefreshToken(user: ITokenProps) {
    return jwt.sign({ user }, jwtConfig.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
  }

  async setCookie(value: string, res: Response) {
    const expire = 24 * 7 * 60 * 60 * 1000;

    return res.cookie("jwt", value, {
      httpOnly: true,
      maxAge: expire,
      secure: true,
      sameSite: "none",
    });
  }

  async login(reqBody: ILogin, res: Response) {
    const { email, password } = reqBody;
    const user = await userService.findByEmail(email);

    if (!user) throw new Error("Invalid email or password");

    const pwdMatch = await passwordCompare(password, user.password);

    if (!pwdMatch) throw new Error("Invalid email or password");

    const refreshToken = await this.generateRefreshToken({ id: user.id, email: user.email });

    await this.setCookie(refreshToken, res);

    return this.generateAccessToken({ id: user.id, email: user.email });
  }

  async logout(res: Response) {
    return res.cookie("jwt", "", { maxAge: 1 });
  }
}

export default new AuthService();
