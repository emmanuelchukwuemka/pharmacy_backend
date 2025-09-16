"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPatientSchema = exports.healthcareLoginSchema = exports.healthcareSignUpSchema = void 0;
const zod_1 = require("zod");
// SIGN UP VALIDATION
exports.healthcareSignUpSchema = zod_1.z.object({
    bloomzonUserId: zod_1.z.string().min(3),
    email: zod_1.z
        .string()
        .min(1, "Email is required")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
    phone: zod_1.z.string().min(7),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    fullName: zod_1.z.string().min(2, "Full name must be at least 2 characters"),
});
// LOGIN VALIDATION
exports.healthcareLoginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .min(1, "Email is required")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
    password: zod_1.z.string().min(6),
});
// CREATE PATIENT VALIDATION
exports.createPatientSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Full name must be at least 2 characters"),
    age: zod_1.z.number().min(0, "Age must be a positive number"),
    sex: zod_1.z.enum(["male", "female", "other"]),
    phoneNumber: zod_1.z.string().min(7).optional(),
    email: zod_1.z
        .string()
        .min(1, "Email is required")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
        .optional(),
    nationality: zod_1.z.string().min(2, "must be at least 2 characters"),
    stateOfOrigin: zod_1.z.string().min(2, "must be at least 2 characters"),
    bloodGroup: zod_1.z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
    allergies: zod_1.z.array(zod_1.z.string()).optional().nullable(),
    medicalHistory: zod_1.z.string().optional().nullable(),
    emergencyContact: zod_1.z.string().min(7).optional(),
});
