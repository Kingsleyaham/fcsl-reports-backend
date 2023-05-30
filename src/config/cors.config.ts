import dotenv from "dotenv";
dotenv.config();

// const allowedOrigins: Array<string> = (process.env.ALLOWED_ORIGIN as string).split(",");
const allowedOrigins: Array<string> = [
  "http://localhost:3000",
  "https://fcsl-reports-admin.vercel.app",
];

export default allowedOrigins;
