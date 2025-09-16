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
exports.checkMedicineInteractions = exports.getAuditTrail = exports.getComplianceReports = exports.getSalesAnalytics = exports.getDashboardAnalytics = exports.shipOrder = exports.processOrder = exports.getOrders = exports.getPrescriptions = exports.verifyPrescription = exports.updateInventory = exports.getInventory = exports.addInventory = exports.deleteMedicine = exports.updateMedicine = exports.getMedicines = exports.addMedicine = exports.verifyLicense = exports.updatePharmacyProfile = exports.getPharmacyProfile = exports.verifyEmail = exports.registerPharmacy = void 0;
const pharmacyServices = __importStar(require("./pharmacy.services"));
const pharmacy_validations_1 = require("./pharmacy.validations");
const zod_1 = require("zod");
const apiResponse_1 = require("../../../globals/utility/apiResponse");
const registerPharmacy = async (req, res) => {
    try {
        const validatedData = pharmacy_validations_1.pharmacyRegisterSchema.parse(req.body);
        const result = await pharmacyServices.registerPharmacy(validatedData);
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
            statusCode: 500,
            message: "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.registerPharmacy = registerPharmacy;
const verifyEmail = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Verification token is required",
            });
        }
        const result = await pharmacyServices.verifyEmail(token);
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Email verification failed",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.verifyEmail = verifyEmail;
const getPharmacyProfile = async (req, res) => {
    try {
        const result = await pharmacyServices.getPharmacyProfile(req.user.id);
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message || "Pharmacy profile retrieved successfully",
            data: result.data || result,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Failed to retrieve pharmacy profile",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.getPharmacyProfile = getPharmacyProfile;
const updatePharmacyProfile = async (req, res) => {
    try {
        const validatedData = pharmacy_validations_1.pharmacyRegisterSchema.parse(req.body);
        const result = await pharmacyServices.updatePharmacyProfile(req.user.id, validatedData);
        return (0, apiResponse_1.successResponse)(res, {
            message: "Pharmacy profile updated successfully",
            data: result,
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
            statusCode: 500,
            message: "Failed to update pharmacy profile",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.updatePharmacyProfile = updatePharmacyProfile;
const verifyLicense = async (req, res) => {
    try {
        const result = await pharmacyServices.verifyLicense(req.body);
        return (0, apiResponse_1.successResponse)(res, {
            message: "License verification submitted",
            data: result,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "License verification failed",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.verifyLicense = verifyLicense;
// Medicine Management Controllers
const addMedicine = async (req, res) => {
    try {
        const validatedData = pharmacy_validations_1.pharmacyMedicineSchema.parse(req.body);
        const result = await pharmacyServices.addMedicine(req.user.id, validatedData);
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
            statusCode: 500,
            message: "Failed to add medicine",
            details: process.env.NODE_ENV === "development" ? err.message : undefined,
        });
    }
};
exports.addMedicine = addMedicine;
const getMedicines = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, category } = req.query;
        const result = await pharmacyServices.getMedicines(req.user.id, {
            page: Number(page),
            limit: Number(limit),
            search: search,
            category: category,
        });
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Failed to fetch medicines",
            details: process.env.NODE_ENV === "development" ? err.message : undefined,
        });
    }
};
exports.getMedicines = getMedicines;
const updateMedicine = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pharmacyServices.updateMedicine(req.user.id, Number(id), req.body);
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Failed to update medicine",
            details: process.env.NODE_ENV === "development" ? err.message : undefined,
        });
    }
};
exports.updateMedicine = updateMedicine;
const deleteMedicine = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pharmacyServices.deleteMedicine(req.user.id, Number(id));
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Failed to delete medicine",
            details: process.env.NODE_ENV === "development" ? err.message : undefined,
        });
    }
};
exports.deleteMedicine = deleteMedicine;
// Inventory Management Controllers
const addInventory = async (req, res) => {
    try {
        const result = await pharmacyServices.addInventory(req.user.id, req.body);
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Failed to add inventory",
            details: process.env.NODE_ENV === "development" ? err.message : undefined,
        });
    }
};
exports.addInventory = addInventory;
const getInventory = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, lowStock } = req.query;
        const result = await pharmacyServices.getInventory(req.user.id, {
            page: Number(page),
            limit: Number(limit),
            search: search,
            lowStock: lowStock === "true",
        });
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Failed to fetch inventory",
            details: process.env.NODE_ENV === "development" ? err.message : undefined,
        });
    }
};
exports.getInventory = getInventory;
const updateInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pharmacyServices.updateInventory(req.user.id, Number(id), req.body);
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Failed to update inventory",
            details: process.env.NODE_ENV === "development" ? err.message : undefined,
        });
    }
};
exports.updateInventory = updateInventory;
// Prescription Management Controllers
const verifyPrescription = async (req, res) => {
    try {
        const result = await pharmacyServices.verifyPrescription(req.user.id, req.body);
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Prescription verification failed",
            details: process.env.NODE_ENV === "development" ? err.message : undefined,
        });
    }
};
exports.verifyPrescription = verifyPrescription;
const getPrescriptions = async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const result = await pharmacyServices.getPrescriptions(req.user.id, {
            page: Number(page),
            limit: Number(limit),
            status: status,
        });
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Failed to fetch prescriptions",
            details: process.env.NODE_ENV === "development" ? err.message : undefined,
        });
    }
};
exports.getPrescriptions = getPrescriptions;
// Order Management Controllers
const getOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, search } = req.query;
        const result = await pharmacyServices.getOrders(req.user.id, {
            page: Number(page),
            limit: Number(limit),
            status: status,
            search: search,
        });
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Failed to fetch orders",
            details: process.env.NODE_ENV === "development" ? err.message : undefined,
        });
    }
};
exports.getOrders = getOrders;
const processOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pharmacyServices.processOrder(req.user.id, Number(id), req.body);
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Order processing failed",
            details: process.env.NODE_ENV === "development" ? err.message : undefined,
        });
    }
};
exports.processOrder = processOrder;
const shipOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pharmacyServices.shipOrder(req.user.id, Number(id), req.body);
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Order shipping failed",
            details: process.env.NODE_ENV === "development" ? err.message : undefined,
        });
    }
};
exports.shipOrder = shipOrder;
// Analytics Controllers
const getDashboardAnalytics = async (req, res) => {
    try {
        const { period = "30d" } = req.query;
        const result = await pharmacyServices.getDashboardAnalytics(req.user.id, period);
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Failed to fetch analytics",
            details: process.env.NODE_ENV === "development" ? err.message : undefined,
        });
    }
};
exports.getDashboardAnalytics = getDashboardAnalytics;
const getSalesAnalytics = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const result = await pharmacyServices.getSalesAnalytics(req.user.id, {
            startDate: startDate,
            endDate: endDate,
        });
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Failed to fetch sales analytics",
            details: process.env.NODE_ENV === "development" ? err.message : undefined,
        });
    }
};
exports.getSalesAnalytics = getSalesAnalytics;
// Compliance Controllers
const getComplianceReports = async (req, res) => {
    try {
        const { type, period } = req.query;
        const result = await pharmacyServices.getComplianceReports(req.user.id, {
            type: type,
            period: period,
        });
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Failed to fetch compliance reports",
            details: process.env.NODE_ENV === "development" ? err.message : undefined,
        });
    }
};
exports.getComplianceReports = getComplianceReports;
const getAuditTrail = async (req, res) => {
    try {
        const { page = 1, limit = 10, action, entityType } = req.query;
        const result = await pharmacyServices.getAuditTrail(req.user.id, {
            page: Number(page),
            limit: Number(limit),
            action: action,
            entityType: entityType,
        });
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Failed to fetch audit trail",
            details: process.env.NODE_ENV === "development" ? err.message : undefined,
        });
    }
};
exports.getAuditTrail = getAuditTrail;
// Medicine Interaction Check
const checkMedicineInteractions = async (req, res) => {
    try {
        const { medicineIds } = req.body;
        const result = await pharmacyServices.checkMedicineInteractions(medicineIds);
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Interaction check failed",
            details: process.env.NODE_ENV === "development" ? err.message : undefined,
        });
    }
};
exports.checkMedicineInteractions = checkMedicineInteractions;
