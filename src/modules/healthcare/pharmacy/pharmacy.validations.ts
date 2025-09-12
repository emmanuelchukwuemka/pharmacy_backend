import { z } from "zod";

// Pharmacy registration validation schema
export const pharmacyRegisterSchema = z.object({
  name: z.string().min(2, "Pharmacy name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number is required").max(15, "Invalid phone number"),
  address: z.string().min(10, "Address is required").max(500, "Address is too long"),
  licenseNumber: z.string().min(5, "License number is required"),
  ownerName: z.string().min(2, "Owner name is required").max(100, "Owner name is too long"),
  businessType: z.enum(["independent", "chain", "hospital", "clinic"]),
  operatingHours: z.object({
    monday: z.object({ open: z.string(), close: z.string() }),
    tuesday: z.object({ open: z.string(), close: z.string() }),
    wednesday: z.object({ open: z.string(), close: z.string() }),
    thursday: z.object({ open: z.string(), close: z.string() }),
    friday: z.object({ open: z.string(), close: z.string() }),
    saturday: z.object({ open: z.string(), close: z.string() }),
    sunday: z.object({ open: z.string(), close: z.string() }),
  }),
  services: z.array(z.string()).min(1, "At least one service is required"),
});

// Medicine management validation schema
export const pharmacyMedicineSchema = z.object({
  name: z.string().min(2, "Medicine name is required").max(200, "Name is too long"),
  genericName: z.string().optional(),
  brandName: z.string().optional(),
  description: z.string().max(1000, "Description is too long"),
  category: z.string().min(2, "Category is required"),
  dosage: z.string().min(1, "Dosage is required"),
  form: z.enum(["tablet", "capsule", "liquid", "injection", "cream", "ointment", "powder", "other"]),
  strength: z.string().min(1, "Strength is required"),
  unit: z.string().min(1, "Unit is required"),
  prescriptionRequired: z.boolean().default(false),
  price: z.number().positive("Price must be positive"),
  stockQuantity: z.number().int().min(0, "Stock quantity cannot be negative"),
  expiryDate: z.string().refine((date) => new Date(date) > new Date(), "Expiry date must be in the future"),
  batchNumber: z.string().min(1, "Batch number is required"),
  manufacturer: z.string().min(2, "Manufacturer is required"),
  sideEffects: z.array(z.string()).optional(),
  interactions: z.array(z.string()).optional(),
});

// Inventory management validation schema
export const pharmacyInventorySchema = z.object({
  medicineId: z.number().int().positive("Medicine ID is required"),
  quantity: z.number().int().min(0, "Quantity cannot be negative"),
  batchNumber: z.string().min(1, "Batch number is required"),
  expiryDate: z.string().refine((date) => new Date(date) > new Date(), "Expiry date must be in the future"),
  purchasePrice: z.number().positive("Purchase price must be positive"),
  sellingPrice: z.number().positive("Selling price must be positive"),
  supplier: z.string().min(2, "Supplier is required"),
  location: z.string().min(1, "Storage location is required"),
});

// Order processing validation schema
export const pharmacyOrderSchema = z.object({
  customerId: z.number().int().positive("Customer ID is required"),
  items: z.array(z.object({
    medicineId: z.number().int().positive("Medicine ID is required"),
    quantity: z.number().int().positive("Quantity must be positive"),
    price: z.number().positive("Price must be positive"),
  })).min(1, "At least one item is required"),
  prescriptionId: z.number().int().optional(),
  deliveryAddress: z.string().min(10, "Delivery address is required"),
  deliveryMethod: z.enum(["pickup", "delivery", "express"]),
  paymentMethod: z.enum(["cash", "card", "insurance", "online"]),
  notes: z.string().max(500, "Notes are too long").optional(),
});

// Prescription verification validation schema
export const pharmacyPrescriptionSchema = z.object({
  prescriptionNumber: z.string().min(5, "Prescription number is required"),
  patientName: z.string().min(2, "Patient name is required"),
  doctorName: z.string().min(2, "Doctor name is required"),
  medicines: z.array(z.object({
    name: z.string().min(2, "Medicine name is required"),
    dosage: z.string().min(1, "Dosage is required"),
    quantity: z.number().int().positive("Quantity must be positive"),
    instructions: z.string().min(5, "Instructions are required"),
  })).min(1, "At least one medicine is required"),
  issueDate: z.string().refine((date) => new Date(date) <= new Date(), "Issue date cannot be in the future"),
  expiryDate: z.string().refine((date) => new Date(date) > new Date(), "Expiry date must be in the future"),
});

// Inferred TypeScript types from schemas
export type PharmacyRegisterInput = z.infer<typeof pharmacyRegisterSchema>;
export type PharmacyMedicineInput = z.infer<typeof pharmacyMedicineSchema>;
export type PharmacyInventoryInput = z.infer<typeof pharmacyInventorySchema>;
export type PharmacyOrderInput = z.infer<typeof pharmacyOrderSchema>;
export type PharmacyPrescriptionInput = z.infer<typeof pharmacyPrescriptionSchema>;
