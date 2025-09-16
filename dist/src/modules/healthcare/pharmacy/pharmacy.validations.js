"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pharmacyPrescriptionSchema = exports.pharmacyOrderSchema = exports.pharmacyInventorySchema = exports.pharmacyMedicineSchema = exports.pharmacyRegisterSchema = void 0;
const zod_1 = require("zod");
// Pharmacy registration validation schema
exports.pharmacyRegisterSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Pharmacy name is required").max(100, "Name is too long"),
    email: zod_1.z.string().email("Invalid email format"),
    phone: zod_1.z.string().min(10, "Phone number is required").max(15, "Invalid phone number"),
    address: zod_1.z.string().min(10, "Address is required").max(500, "Address is too long"),
    licenseNumber: zod_1.z.string().min(5, "License number is required"),
    ownerName: zod_1.z.string().min(2, "Owner name is required").max(100, "Owner name is too long"),
    businessType: zod_1.z.enum(["independent", "chain", "hospital", "clinic"]),
    operatingHours: zod_1.z.object({
        monday: zod_1.z.object({ open: zod_1.z.string(), close: zod_1.z.string() }),
        tuesday: zod_1.z.object({ open: zod_1.z.string(), close: zod_1.z.string() }),
        wednesday: zod_1.z.object({ open: zod_1.z.string(), close: zod_1.z.string() }),
        thursday: zod_1.z.object({ open: zod_1.z.string(), close: zod_1.z.string() }),
        friday: zod_1.z.object({ open: zod_1.z.string(), close: zod_1.z.string() }),
        saturday: zod_1.z.object({ open: zod_1.z.string(), close: zod_1.z.string() }),
        sunday: zod_1.z.object({ open: zod_1.z.string(), close: zod_1.z.string() }),
    }),
    services: zod_1.z.array(zod_1.z.string()).min(1, "At least one service is required"),
});
// Medicine management validation schema
exports.pharmacyMedicineSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Medicine name is required").max(200, "Name is too long"),
    genericName: zod_1.z.string().optional(),
    brandName: zod_1.z.string().optional(),
    description: zod_1.z.string().max(1000, "Description is too long"),
    category: zod_1.z.string().min(2, "Category is required"),
    dosage: zod_1.z.string().min(1, "Dosage is required"),
    form: zod_1.z.enum(["tablet", "capsule", "liquid", "injection", "cream", "ointment", "powder", "other"]),
    strength: zod_1.z.string().min(1, "Strength is required"),
    unit: zod_1.z.string().min(1, "Unit is required"),
    prescriptionRequired: zod_1.z.boolean().default(false),
    price: zod_1.z.number().positive("Price must be positive"),
    stockQuantity: zod_1.z.number().int().min(0, "Stock quantity cannot be negative"),
    expiryDate: zod_1.z.string().refine((date) => new Date(date) > new Date(), "Expiry date must be in the future"),
    batchNumber: zod_1.z.string().min(1, "Batch number is required"),
    manufacturer: zod_1.z.string().min(2, "Manufacturer is required"),
    sideEffects: zod_1.z.array(zod_1.z.string()).optional(),
    interactions: zod_1.z.array(zod_1.z.string()).optional(),
});
// Inventory management validation schema
exports.pharmacyInventorySchema = zod_1.z.object({
    medicineId: zod_1.z.number().int().positive("Medicine ID is required"),
    quantity: zod_1.z.number().int().min(0, "Quantity cannot be negative"),
    batchNumber: zod_1.z.string().min(1, "Batch number is required"),
    expiryDate: zod_1.z.string().refine((date) => new Date(date) > new Date(), "Expiry date must be in the future"),
    purchasePrice: zod_1.z.number().positive("Purchase price must be positive"),
    sellingPrice: zod_1.z.number().positive("Selling price must be positive"),
    supplier: zod_1.z.string().min(2, "Supplier is required"),
    location: zod_1.z.string().min(1, "Storage location is required"),
});
// Order processing validation schema
exports.pharmacyOrderSchema = zod_1.z.object({
    customerId: zod_1.z.number().int().positive("Customer ID is required"),
    items: zod_1.z.array(zod_1.z.object({
        medicineId: zod_1.z.number().int().positive("Medicine ID is required"),
        quantity: zod_1.z.number().int().positive("Quantity must be positive"),
        price: zod_1.z.number().positive("Price must be positive"),
    })).min(1, "At least one item is required"),
    prescriptionId: zod_1.z.number().int().optional(),
    deliveryAddress: zod_1.z.string().min(10, "Delivery address is required"),
    deliveryMethod: zod_1.z.enum(["pickup", "delivery", "express"]),
    paymentMethod: zod_1.z.enum(["cash", "card", "insurance", "online"]),
    notes: zod_1.z.string().max(500, "Notes are too long").optional(),
});
// Prescription verification validation schema
exports.pharmacyPrescriptionSchema = zod_1.z.object({
    prescriptionNumber: zod_1.z.string().min(5, "Prescription number is required"),
    patientName: zod_1.z.string().min(2, "Patient name is required"),
    doctorName: zod_1.z.string().min(2, "Doctor name is required"),
    medicines: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string().min(2, "Medicine name is required"),
        dosage: zod_1.z.string().min(1, "Dosage is required"),
        quantity: zod_1.z.number().int().positive("Quantity must be positive"),
        instructions: zod_1.z.string().min(5, "Instructions are required"),
    })).min(1, "At least one medicine is required"),
    issueDate: zod_1.z.string().refine((date) => new Date(date) <= new Date(), "Issue date cannot be in the future"),
    expiryDate: zod_1.z.string().refine((date) => new Date(date) > new Date(), "Expiry date must be in the future"),
});
