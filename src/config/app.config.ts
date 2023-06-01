import dotenv from "dotenv";
dotenv.config();

const BASE_URL =
  process.env.NODE_ENV === "development" ? process.env.BASE_URL_DEV! : process.env.BASE_URL_PROD!;

const appConfig = {
  PORT: process.env.PORT! || 5000,
  HOST: process.env.HOST! || "localhost",
  NODE_ENV: process.env.NODE_ENV!,
  BASE_URL,
};

export default appConfig;
