import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype == "application/pdf") {
    console.log(file);
    cb(null, true);
  } else {
    console.log(file);

    cb(null, false);
    return cb(new Error("only .pdf files are allowed"));
  }
};

const fileName = (req: Request, file: Express.Multer.File, cb: any) => {
  const uniqueSuffix = Date.now();

  cb(null, `${uniqueSuffix}-${file.originalname}`);
};

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), "/src/assets/uploads/reports"),
  filename: fileName,
});

export const fileUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 256 * 1024 * 1024 },
});
