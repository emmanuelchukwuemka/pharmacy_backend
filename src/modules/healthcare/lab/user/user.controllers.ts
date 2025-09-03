import { Request, Response } from "express";
import * as userServices from "./user.services";
import { loginSchema, signUpSchema } from "./user.validations";
import { ZodError } from "zod";
import {
  successResponse,
  errorResponse,
} from "../../../../globals/utility/apiResponse";
import { MulterFiles } from "./user.types";

export const sample = async (req: Request, res: Response) => {
  try {
    // For dis place, am validating request body using Zod
    const validatedData = signUpSchema.parse(req.body);

    // And here i dey call the service layer
    const result = await userServices.userMethod(validatedData);

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Validation error",
        details: err.issues,
      });
    }

    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected error",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    // For dis place, am validating request body using Zod
    const validatedData = signUpSchema.parse(req.body);

    // And here i dey call the service layer
    const files = req.files as MulterFiles;
    const result = await userServices.signUp(req, files, validatedData);

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Validation error",
        details: err.issues,
      });
    }

    return errorResponse(res, {
      statusCode: err.statusCode || 500,
      message: err.message || "Unexpected error",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};
