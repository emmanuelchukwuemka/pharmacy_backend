"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTestPanelComponentSchema = exports.createLabTestSchema = exports.createLabReportSchema = exports.labSchema = void 0;
const zod_1 = require("zod");
// Am creating validation schema for Lab here
exports.labSchema = zod_1.z.object({
// Example
//name: z.string().min(2, "Name is required").max(50, "Name is too long"),
});
exports.createLabReportSchema = zod_1.z.object({
    patientName: zod_1.z
        .string()
        .min(2, "Patient name is required")
        .max(100, "Patient name is too long"),
    patientId: zod_1.z
        .string()
        .min(1, "Patient ID is required")
        .max(10, "Patient ID is too long"),
    testName: zod_1.z
        .string()
        .min(2, "Test name is required")
        .max(100, "Test name is too long"),
    testId: zod_1.z.string().optional(),
    status: zod_1.z.enum(["pending", "completed"]),
    reportFile: zod_1.z.string().url("Report file must be a valid URL").optional(),
    comments: zod_1.z.string().max(500, "Comments are too long").optional(),
    reviewedBy: zod_1.z.string().max(100, "Reviewed by is too long").optional(),
    createdBy: zod_1.z
        .string()
        .min(1, "Created by is required")
        .max(100, "Created by is too long"),
});
exports.createLabTestSchema = zod_1.z.object({
    labId: zod_1.z
        .string()
        .min(2, "Patient name is required")
        .max(100, "Patient name is too long"),
    testName: zod_1.z
        .string()
        .min(2, "Test name is required")
        .max(100, "Test name is too long"),
    testImage: zod_1.z
        .string()
        .min(2, "Test image/icon url is required")
        .max(100, "Test image/icon url is too long"),
    type: zod_1.z.enum(["single", "panel"]).default("single"),
    description: zod_1.z
        .string()
        .min(2, "Description is required")
        .max(500, "Description is too long"),
    price: zod_1.z.number().min(0, "Price must be a positive number"),
    currency: zod_1.z
        .string()
        .min(0, "Currency is required")
        .max(10, "Currency is too long"),
    sampleType: zod_1.z
        .string()
        .min(2, "Sample type is required")
        .max(100, "Sample type is too long"),
    tat: zod_1.z.string().max(100, "TAT is too long").optional(),
    preparationInstructions: zod_1.z
        .array(zod_1.z.string().max(200, "Each instruction is too long"))
        .optional(),
    availability: zod_1.z.boolean(),
});
exports.addTestPanelComponentSchema = zod_1.z.object({
    testId: zod_1.z.string(),
    componentName: zod_1.z.string(),
    unit: zod_1.z.string().optional(),
    referenceRange: zod_1.z.string().optional(),
});
