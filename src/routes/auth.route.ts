import { validateSignup, validateLogin } from "./../middlewares/validation.middleware";
import { Router } from "express";
import authController from "../controllers/auth.controller";

const router = Router();

router.post("/login", validateLogin, authController.login);
router.post("/signup", validateSignup, authController.signup);
router.get("/logout", authController.logout);

export default router;
