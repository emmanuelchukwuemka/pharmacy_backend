import { Request, Response } from "express";

export interface Files {
  //   filesList: Express.Multer.File[];
}

export interface errorObject {
  message: string;
  statusCode: number;
}
