import { requireAuth } from "./../middlewares/auth.middleware";
import { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import reportRoute from "./report.route";
import refreshTokenRoute from "./refreshToken.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", requireAuth, userRoute);
router.use("/reports", requireAuth, reportRoute);
router.use("/refresh", refreshTokenRoute);

export default router;
