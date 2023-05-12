import dotenv from "dotenv";
import express from "express";
import { appConfig } from "./config";
import sequelize from "./database";
import cors from "cors";
import helmet from "helmet";
import router from "./routes";

const app = express();
dotenv.config();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors()); // Allows incoming requests from any ip

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
