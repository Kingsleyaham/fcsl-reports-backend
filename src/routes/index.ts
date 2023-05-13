import { requireAuth } from "./../middlewares/auth.middleware";
import { upload } from "./../middlewares/fileUpload.middleware";
import { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import reportRoute from "./report.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", requireAuth, userRoute);
router.use("/reports", requireAuth, upload.any(), reportRoute);

export default router;
