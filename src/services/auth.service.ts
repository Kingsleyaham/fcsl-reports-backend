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
    const token = jwt.sign({ ...user }, jwtConfig.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

    return { token };
  }

  async generateRefreshToken(user: ITokenProps) {
    return jwt.sign({ user }, jwtConfig.REFRESH_TOKEN_SECRET, { expiresIn: "3d" });
  }

  async setCookie(value: string, res: Response) {
    const expire = 3 * 24 * 60 * 60 * 1000;

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

    const token = await this.generateAccessToken({ id: user.id, email: user.email });

    const newUser = await userService.findById(user.id);

    return { ...token, user: newUser };
  }

  async logout(res: Response) {
    return res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  }
}

export default new AuthService();
