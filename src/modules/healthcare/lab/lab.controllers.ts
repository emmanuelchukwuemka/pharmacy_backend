import { Request, Response } from "express";
import * as labServices from "./lab.services";
import {
  addTestPanelComponentSchema,
  createLabReportSchema,
  createLabTestSchema,
  labSchema,
} from "./lab.validations";
import { ZodError } from "zod";
import {
  successResponse,
  errorResponse,
} from "../../../globals/utility/apiResponse";
import {
  addTestPanelComponentService,
  createLabReportService,
  createLabTestService,
} from "./services";

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
    const validatedData = createLabReportSchema.parse(req.body);

    const result = await createLabReportService(validatedData);

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

export const createLabTest = async (req: Request, res: Response) => {
  try {
    const validatedData = createLabTestSchema.parse(req.body);

    const result = await createLabTestService(validatedData);

    return successResponse(res, result);
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

export const addTestPanelComponent = async (req: Request, res: Response) => {
  try {
    const validatedData = addTestPanelComponentSchema.parse(req.body);

    const result = await addTestPanelComponentService(validatedData);

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
