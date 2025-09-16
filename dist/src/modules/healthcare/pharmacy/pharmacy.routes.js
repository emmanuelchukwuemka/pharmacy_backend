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
const express_1 = require("express");
const pharmacyControllers = __importStar(require("./pharmacy.controllers"));
const router = (0, express_1.Router)();
// Pharmacy registration and management routes
router.post("/register", pharmacyControllers.registerPharmacy);
router.post("/verify-email", pharmacyControllers.verifyEmail);
router.get("/profile", pharmacyControllers.getPharmacyProfile);
router.put("/profile", pharmacyControllers.updatePharmacyProfile);
router.post("/verify-license", pharmacyControllers.verifyLicense);
// Medicine management routes
router.post("/medicines", pharmacyControllers.addMedicine);
router.get("/medicines", pharmacyControllers.getMedicines);
router.put("/medicines/:id", pharmacyControllers.updateMedicine);
router.delete("/medicines/:id", pharmacyControllers.deleteMedicine);
// Inventory management routes
router.post("/inventory", pharmacyControllers.addInventory);
router.get("/inventory", pharmacyControllers.getInventory);
router.put("/inventory/:id", pharmacyControllers.updateInventory);
// Order management routes
router.get("/orders", pharmacyControllers.getOrders);
router.put("/orders/:id/process", pharmacyControllers.processOrder);
router.post("/orders/:id/ship", pharmacyControllers.shipOrder);
// Prescription management routes
router.post("/prescriptions/verify", pharmacyControllers.verifyPrescription);
router.get("/prescriptions", pharmacyControllers.getPrescriptions);
// Analytics routes
router.get("/analytics/dashboard", pharmacyControllers.getDashboardAnalytics);
router.get("/analytics/sales", pharmacyControllers.getSalesAnalytics);
exports.default = router;
