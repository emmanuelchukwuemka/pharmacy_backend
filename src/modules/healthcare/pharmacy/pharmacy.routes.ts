import { Router } from "express";
import * as pharmacyControllers from "./pharmacy.controllers";

const router = Router();

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

export default router;
