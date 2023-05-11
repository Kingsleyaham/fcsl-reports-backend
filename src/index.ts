import express from "express";
import { appConfig } from "./config";
import sequelize from "./database";

const app = express();

app.listen(appConfig.PORT, async () => {
  console.log(`server running on http://${appConfig.HOST}:${appConfig.PORT}`);

  try {
    await sequelize.authenticate();
    if (appConfig.NODE_ENV === "development") await sequelize.sync({ alter: true });
    // await sequelize.sync({ alter: true });
    console.log("Connection to database successful.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
