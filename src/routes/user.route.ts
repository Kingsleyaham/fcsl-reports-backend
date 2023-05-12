import { validateUser, validatePassword } from "./../middlewares/validation.middleware";
import userController from "./../controllers/user.controller";

import { Router } from "express";
import { upload } from "../middlewares/fileUpload.middleware";

const router = Router();

router.get("/", userController.findAll);
router.get("/:id", userController.findUser);
router.put("/:id", validateUser, userController.updateUser);
router.put("/:id/password", validatePassword, userController.updatePassword);
router.put("/:id/upload", upload.single("avatar"), userController.uploadProfileImg);
router.delete("/:id", userController.deleteUser);

export default router;
