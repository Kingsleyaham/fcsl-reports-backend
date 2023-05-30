import dotenv from "dotenv";
dotenv.config();

// const allowedOrigins: Array<string> = (process.env.ALLOWED_ORIGIN as string).split(",");
const allowedOrigins: Array<string> = ["http://localhost:3000"];

export default allowedOrigins;
