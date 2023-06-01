import { avatarUpload } from "./../middlewares/avatarUpload.middleware";
import { validateUser, validatePassword } from "./../middlewares/validation.middleware";
import userController from "./../controllers/user.controller";

import { Router } from "express";

const router = Router();

router.get("/", userController.findAll);

router
  .route("/:id")
  .get(userController.findUser)
  .put(validateUser, userController.updateUser)
  .delete(userController.deleteUser);

router.put("/update/password", validatePassword, userController.updatePassword);
router.put("/avatar/upload", avatarUpload.single("avatar"), userController.uploadProfileImg);

export default router;
