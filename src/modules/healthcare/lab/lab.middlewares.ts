import { Request, Response, NextFunction } from "express";

export const labSecure = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Middleware executed for lab module");

    next();
  } catch (err) {
    next(err); // Here am just passing the error to global errorHandler
  }
};
