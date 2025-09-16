"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
// Am creating validation schema for User here
exports.signUpSchema = zod_1.z.object({
    // healthcareUserId: z.string().min(2, "Healthcare User ID is required"),
    fullName: zod_1.z.string().min(2, "Name is required").max(50, "Name is too long"),
    labName: zod_1.z.string(),
    email: zod_1.z
        .string()
        .min(1, "Email is required")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
    phone: zod_1.z.string(),
    labAddress: zod_1.z.string().min(1, "Address is required"),
    licenseNumber: zod_1.z.string().min(1, "License number is required"),
    workHours: zod_1.z.string(),
    modeOfService: zod_1.z.enum(["labVisit", "homeVisit"]),
    breakTime: zod_1.z.string(),
});
// Login schema
exports.loginSchema = zod_1.z.object({
    identifier: zod_1.z.string(),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
});
