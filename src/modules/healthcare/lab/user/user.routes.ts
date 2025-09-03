import { Router, Request, Response, NextFunction } from "express";
import * as userControllers from "./user.controllers";
import { multerMiddleware } from "../../healthcare.middlewares";

const router = Router();
router.post("/", userControllers.sample);
router.post(
  "/sign-up",
  multerMiddleware().fields([
    { name: "profilePic", maxCount: 1 },
    { name: "coverPhoto", maxCount: 1 },
  ]),
  userControllers.signUp
);

export default router;
