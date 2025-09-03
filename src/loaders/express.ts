import express, { Application } from "express";
import cors from "cors";
import colors from "colors";
import cookieParser from "cookie-parser";
import { errorHandler } from "../middlewares/system/errorHandler";
import authModule from "../modules/auth";
import userModule from "../modules/user";
import categoriesModule from "../modules/categories";
import healthcareModule from "../modules/healthcare";

export default (app: Application): void => {
  colors.enable();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  // Imported modules will be listed here
  app.use("/api/auth", authModule);

  app.use("/api/user", userModule);

  app.use("/api/categories", categoriesModule);

  app.use("/api/healthcare", healthcareModule);

  app.use(errorHandler);
};
