"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthcareVerifyEmail = exports.createPatient = exports.healthcareLogin = exports.healthcareSignUp = void 0;
const healthcareServices = __importStar(require("./healthcare.services"));
const zod_1 = require("zod");
const apiResponse_1 = require("../../globals/utility/apiResponse");
const healthcare_validations_1 = require("./healthcare.validations");
const healthcareSignUp = async (req, res) => {
    try {
        const validatedData = healthcare_validations_1.healthcareSignUpSchema.parse(req.body);
        const result = await healthcareServices.healthcareSignUp(validatedData);
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error",
                details: err.issues,
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: err.statusCode || 500,
            message: err.message || "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.healthcareSignUp = healthcareSignUp;
const healthcareLogin = async (req, res) => {
    try {
        const validatedData = healthcare_validations_1.healthcareLoginSchema.parse(req.body);
        const result = await healthcareServices.healthcareLogin(validatedData);
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error",
                details: err.issues,
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: err.statusCode || 500,
            message: err.message || "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.healthcareLogin = healthcareLogin;
const createPatient = async (req, res) => {
    try {
        const validatedData = healthcare_validations_1.createPatientSchema.parse(req.body);
        const result = await healthcareServices.createPatient(validatedData);
        return (0, apiResponse_1.successResponse)(res, result);
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error",
                details: err.issues,
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: err.statusCode || 500,
            message: err.message || "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.createPatient = createPatient;
const healthcareVerifyEmail = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Verification token is required",
            });
        }
        const user = await healthcareServices.verifyEmail(token);
        if (!user) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Invalid or expired verification token",
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: "Email verified successfully. Your account is now active.",
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    fullName: user.fullName,
                    bloomzonUserId: user.bloomzonUserId,
                },
            },
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: err.statusCode || 500,
            message: err.message || "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.healthcareVerifyEmail = healthcareVerifyEmail;
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
