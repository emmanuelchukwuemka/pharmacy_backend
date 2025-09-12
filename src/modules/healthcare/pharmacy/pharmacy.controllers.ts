import { Request, Response } from "express";
import * as pharmacyServices from "./pharmacy.services";
import { pharmacyRegisterSchema, pharmacyMedicineSchema } from "./pharmacy.validations";
import { ZodError } from "zod";
import {
  successResponse,
  errorResponse,
} from "../../../globals/utility/apiResponse";

export const registerPharmacy = async (req: Request, res: Response) => {
  try {
    const validatedData = pharmacyRegisterSchema.parse(req.body);
    const result = await pharmacyServices.registerPharmacy(validatedData);
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

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Verification token is required",
      });
    }

    const result = await pharmacyServices.verifyEmail(token);
    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Email verification failed",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

export const getPharmacyProfile = async (req: Request, res: Response) => {
  try {
    const result = await pharmacyServices.getPharmacyProfile(req.user.id);
    return successResponse(res, {
      message: result.message || "Pharmacy profile retrieved successfully",
      data: result.data || result,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Failed to retrieve pharmacy profile",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

export const updatePharmacyProfile = async (req: Request, res: Response) => {
  try {
    const validatedData = pharmacyRegisterSchema.parse(req.body);
    const result = await pharmacyServices.updatePharmacyProfile(req.user.id, validatedData);
    return successResponse(res, {
      message: "Pharmacy profile updated successfully",
      data: result,
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
      message: "Failed to update pharmacy profile",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

export const verifyLicense = async (req: Request, res: Response) => {
  try {
    const result = await pharmacyServices.verifyLicense(req.body);
    return successResponse(res, {
      message: "License verification submitted",
      data: result,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "License verification failed",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

// Medicine Management Controllers
export const addMedicine = async (req: Request, res: Response) => {
  try {
    const validatedData = pharmacyMedicineSchema.parse(req.body);
    const result = await pharmacyServices.addMedicine(req.user.id, validatedData);

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
      message: "Failed to add medicine",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const getMedicines = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search, category } = req.query;
    const result = await pharmacyServices.getMedicines(req.user.id, {
      page: Number(page),
      limit: Number(limit),
      search: search as string,
      category: category as string,
    });

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Failed to fetch medicines",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const updateMedicine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pharmacyServices.updateMedicine(req.user.id, Number(id), req.body);

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Failed to update medicine",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const deleteMedicine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pharmacyServices.deleteMedicine(req.user.id, Number(id));

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Failed to delete medicine",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

// Inventory Management Controllers
export const addInventory = async (req: Request, res: Response) => {
  try {
    const result = await pharmacyServices.addInventory(req.user.id, req.body);

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Failed to add inventory",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const getInventory = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search, lowStock } = req.query;
    const result = await pharmacyServices.getInventory(req.user.id, {
      page: Number(page),
      limit: Number(limit),
      search: search as string,
      lowStock: lowStock === "true",
    });

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Failed to fetch inventory",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const updateInventory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pharmacyServices.updateInventory(req.user.id, Number(id), req.body);

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Failed to update inventory",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

// Prescription Management Controllers
export const verifyPrescription = async (req: Request, res: Response) => {
  try {
    const result = await pharmacyServices.verifyPrescription(req.user.id, req.body);

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Prescription verification failed",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const getPrescriptions = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const result = await pharmacyServices.getPrescriptions(req.user.id, {
      page: Number(page),
      limit: Number(limit),
      status: status as string,
    });

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Failed to fetch prescriptions",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

// Order Management Controllers
export const getOrders = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const result = await pharmacyServices.getOrders(req.user.id, {
      page: Number(page),
      limit: Number(limit),
      status: status as string,
      search: search as string,
    });

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Failed to fetch orders",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const processOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pharmacyServices.processOrder(req.user.id, Number(id), req.body);

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Order processing failed",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const shipOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pharmacyServices.shipOrder(req.user.id, Number(id), req.body);

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Order shipping failed",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

// Analytics Controllers
export const getDashboardAnalytics = async (req: Request, res: Response) => {
  try {
    const { period = "30d" } = req.query;
    const result = await pharmacyServices.getDashboardAnalytics(req.user.id, period as string);

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Failed to fetch analytics",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const getSalesAnalytics = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const result = await pharmacyServices.getSalesAnalytics(req.user.id, {
      startDate: startDate as string,
      endDate: endDate as string,
    });

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Failed to fetch sales analytics",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

// Compliance Controllers
export const getComplianceReports = async (req: Request, res: Response) => {
  try {
    const { type, period } = req.query;
    const result = await pharmacyServices.getComplianceReports(req.user.id, {
      type: type as string,
      period: period as string,
    });

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Failed to fetch compliance reports",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const getAuditTrail = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, action, entityType } = req.query;
    const result = await pharmacyServices.getAuditTrail(req.user.id, {
      page: Number(page),
      limit: Number(limit),
      action: action as string,
      entityType: entityType as string,
    });

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Failed to fetch audit trail",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

// Medicine Interaction Check
export const checkMedicineInteractions = async (req: Request, res: Response) => {
  try {
    const { medicineIds } = req.body;
    const result = await pharmacyServices.checkMedicineInteractions(medicineIds);

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Interaction check failed",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};
