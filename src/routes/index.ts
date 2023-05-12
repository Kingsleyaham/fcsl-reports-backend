import { upload } from "./../middlewares/fileUpload.middleware";
import { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import reportRoute from "./report.route";

const router = Router();

router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/reports", upload.any(), reportRoute);

export default router;
