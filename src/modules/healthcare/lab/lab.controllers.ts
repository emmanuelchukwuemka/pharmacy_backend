import { Request, Response } from "express";
import * as labServices from "./lab.services";
import { labSchema } from "./lab.validations";
import { ZodError } from "zod";
import {
  successResponse,
  errorResponse,
} from "../../../globals/utility/apiResponse";
import { createLabReportService } from "./services";

export const sample = async (req: Request, res: Response) => {
  try {
    // For dis place, am validating request body using Zod
    const validatedData = labSchema.parse(req.body);

    // And here i dey call the service layer
    const result = await labServices.labMethod(validatedData);

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

export const createLabReport = async (req: Request, res: Response) => {
  try {
    // For dis place, am validating request body using Zod
    const validatedData = labSchema.parse(req.body);

    // And here i dey call the service layer
    // const result = await labServices.labMethod(validatedData);
    const result = await createLabReportService();

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
