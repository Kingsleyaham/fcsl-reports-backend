import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("only .png, .jpg and .jpeg format allowed"));
  }
};

const fileName = (req: Request, file: Express.Multer.File, cb: any) => {
  const uniqueSuffix = Date.now();

  cb(null, `${uniqueSuffix}-${file.originalname}`);
};

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), "/src/assets/uploads/avatars"),
  filename: fileName,
});

export const avatarUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 },
});
