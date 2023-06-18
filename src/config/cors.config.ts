import dotenv from "dotenv";
dotenv.config();

const allowedOrigins: Array<string> = process.env.ALLOWED_ORIGIN!.split(" ");

export default allowedOrigins;
