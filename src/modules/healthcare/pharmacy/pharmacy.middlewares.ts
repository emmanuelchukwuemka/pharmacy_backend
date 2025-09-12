import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorResponse } from "../../../globals/utility/apiResponse";

// JWT verification middleware for pharmacy authentication
export const pharmacySecure = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Access token is required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret") as any;

    if (decoded.role !== "pharmacy") {
      return errorResponse(res, {
        statusCode: 403,
        message: "Access denied. Pharmacy role required",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, {
      statusCode: 401,
      message: "Invalid or expired token",
    });
  }
};

// License verification middleware
export const requireLicenseVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if pharmacy license is verified
    // This would typically check against the database
    const isVerified = true; // Placeholder - implement actual check

    if (!isVerified) {
      return errorResponse(res, {
        statusCode: 403,
        message: "Pharmacy license verification required",
      });
    }

    next();
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: "License verification failed",
    });
  }
};

// Prescription handling middleware
export const validatePrescription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate prescription requirements for controlled substances
    const { medicineId, requiresPrescription } = req.body;

    if (requiresPrescription && !req.body.prescriptionId) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Prescription required for this medicine",
      });
    }

    next();
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Prescription validation failed",
    });
  }
};
