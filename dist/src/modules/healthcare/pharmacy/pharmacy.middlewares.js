"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePrescription = exports.requireLicenseVerification = exports.pharmacySecure = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiResponse_1 = require("../../../globals/utility/apiResponse");
// JWT verification middleware for pharmacy authentication
const pharmacySecure = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        if (!token) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 401,
                message: "Access token is required",
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "default_secret");
        if (decoded.role !== "pharmacy") {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 403,
                message: "Access denied. Pharmacy role required",
            });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 401,
            message: "Invalid or expired token",
        });
    }
};
exports.pharmacySecure = pharmacySecure;
// License verification middleware
const requireLicenseVerification = async (req, res, next) => {
    try {
        // Check if pharmacy license is verified
        // This would typically check against the database
        const isVerified = true; // Placeholder - implement actual check
        if (!isVerified) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 403,
                message: "Pharmacy license verification required",
            });
        }
        next();
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "License verification failed",
        });
    }
};
exports.requireLicenseVerification = requireLicenseVerification;
// Prescription handling middleware
const validatePrescription = async (req, res, next) => {
    try {
        // Validate prescription requirements for controlled substances
        const { medicineId, requiresPrescription } = req.body;
        if (requiresPrescription && !req.body.prescriptionId) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Prescription required for this medicine",
            });
        }
        next();
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Prescription validation failed",
        });
    }
};
exports.validatePrescription = validatePrescription;
