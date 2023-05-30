import { validateUser, validatePassword } from "./../middlewares/validation.middleware";
import userController from "./../controllers/user.controller";

import { Router } from "express";
import { upload } from "../middlewares/fileUpload.middleware";

const router = Router();

router.get("/", userController.findAll);

router
  .route("/:id")
  .get(userController.findUser)
  .put(validateUser, userController.updateUser)
  .delete(userController.deleteUser);

router.put("/:id/password", validatePassword, userController.updatePassword);
router.put("/:id/upload", upload.single("avatar"), userController.uploadProfileImg);

export default router;
