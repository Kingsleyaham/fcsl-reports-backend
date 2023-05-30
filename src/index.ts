import dotenv from "dotenv";
import express from "express";
import { appConfig } from "./config";
import sequelize from "./database";
import cors from "cors";
import helmet from "helmet";
import router from "./routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import credentials from "./middlewares/credentials.middleware";
import allowedOrigins from "./config/cors.config";

const app = express();
dotenv.config();

// middlewares
app.use(credentials); //handles options credentials check - before cors
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
// Cross Origin Resource Sharing
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// routes
app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).json({ success: 1, message: "connected successfully" });
});

// start up server
app.listen(appConfig.PORT, async () => {
  console.log(`server running on http://${appConfig.HOST}:${appConfig.PORT}`);

  try {
    await sequelize.authenticate(); // connect to databasee
    if (appConfig.NODE_ENV === "development") await sequelize.sync({ alter: true });
    // await sequelize.sync({ alter: true });
    console.log("Connection to database successful.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
