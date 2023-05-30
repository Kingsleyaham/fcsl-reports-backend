import { NextFunction, Request, Response } from "express";
import loginSchema from "../schema/login.schema";
import signupSchema from "../schema/signup.schema";
import userSchema from "../schema/user.schema";
import passwordSchema from "../schema/password.schema";

export const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await loginSchema.validateAsync({ ...req.body }, { abortEarly: false, allowUnknown: false });
    next();
  } catch (err: any) {
    return res.status(401).json({ success: false, error: err.message });
  }
};

export const validateSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await signupSchema.validateAsync({ ...req.body }, { abortEarly: false, allowUnknown: false });
    next();
  } catch (err: any) {
    return res.status(401).json({ success: false, error: err.message });
  }
};

export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userSchema.validateAsync({ ...req.body }, { abortEarly: false, allowUnknown: false });
    next();
  } catch (err: any) {
    return res.status(401).json({ success: false, error: err.message });
  }
};

export const validatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await passwordSchema.validateAsync({ ...req.body }, { abortEarly: false, allowUnknown: false });
    next();
  } catch (err: any) {
    return res.status(401).json({ success: false, error: err.message });
  }
};
