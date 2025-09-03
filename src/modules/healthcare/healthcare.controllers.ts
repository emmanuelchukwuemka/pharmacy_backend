import { Request, Response } from "express";
import * as healthcareServices from "./healthcare.services";
import { ZodError } from "zod";
import {
  successResponse,
  errorResponse,
} from "../../globals/utility/apiResponse";

import {
  healthcareSignUpSchema,
  healthcareLoginSchema,
} from "./healthcare.validations";
import {
  HealthcareUserInput,
  HealthcareLoginInput,
} from "./healthcare.validations";

export const healthcareSignUp = async (req: Request, res: Response) => {
  try {
    const validatedData: HealthcareUserInput = healthcareSignUpSchema.parse(
      req.body
    );
    const result = await healthcareServices.healthcareSignUp(validatedData);

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

export const healthcareLogin = async (req: Request, res: Response) => {
  try {
    const validatedData: HealthcareLoginInput = healthcareLoginSchema.parse(
      req.body
    );
    const result = await healthcareServices.healthcareLogin(validatedData);

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

// import { healthcareSchema } from "./healthcare.validations";

// export const sample = async (req: Request, res: Response) => {
//   try {
//     // For dis place, am validating request body using Zod
//     const validatedData = healthcareSchema.parse(req.body);

//     // And here i dey call the service layer
//     const result = await healthcareServices.healthcareMethod(validatedData);

//     return successResponse(res, {
//       message: result.message,
//       data: result.data,
//     });
//   } catch (err: any) {
//     if (err instanceof ZodError) {
//       return errorResponse(res, {
//         statusCode: 400,
//         message: "Validation error",
//         details: err.issues,
//       });
//     }

//     return errorResponse(res, {
//       statusCode: 500,
//       message: "Unexpected error",
//       details: process.env.NODE_ENV === "development" ? err.stack : undefined,
//     });
//   }
// };
