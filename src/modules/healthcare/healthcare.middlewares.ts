import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import { errorResponse } from "../../globals/utility/apiResponse";

export const healthcareSecure = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Middleware executed for healthcare module");

    next();
  } catch (err) {
    next(err); // Here am just passing the error to global errorHandler
  }
};

export const multerMiddleware = (maxSize: number = 50) => {
  try {
    const uploadDir = path.join(__dirname, "file-uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadDir);
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    });

    return multer({
      storage,
      limits: {
        fileSize: maxSize * 1024 * 1024,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Multer error: " + error);
  }
};

// Auth
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse(res, {
      statusCode: 401,
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    return errorResponse(res, {
      statusCode: 401,
      message: "Invalid or expired token",
    });
  }
};
