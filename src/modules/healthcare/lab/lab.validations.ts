import { optional, z } from "zod";

// Am creating validation schema for Lab here
export const labSchema = z.object({
  // Example
  //name: z.string().min(2, "Name is required").max(50, "Name is too long"),
});

// Inferred TypeScript type from schema
export type LabInput = z.infer<typeof labSchema>;

export const createLabReportSchema = z.object({
  patientName: z
    .string()
    .min(2, "Patient name is required")
    .max(100, "Patient name is too long"),
  patientId: z
    .string()
    .min(1, "Patient ID is required")
    .max(10, "Patient ID is too long"),
  testName: z
    .string()
    .min(2, "Test name is required")
    .max(100, "Test name is too long"),
  testId: z.string().optional(),
  status: z.enum(["pending", "completed"]),
  reportFile: z.string().url("Report file must be a valid URL").optional(),
  comments: z.string().max(500, "Comments are too long").optional(),
  reviewedBy: z.string().max(100, "Reviewed by is too long").optional(),
  createdBy: z
    .string()
    .min(1, "Created by is required")
    .max(100, "Created by is too long"),
});

export type CreateLabReportInput = z.infer<typeof createLabReportSchema>;

export const createLabTestSchema = z.object({
  labId: z
    .string()
    .min(2, "Patient name is required")
    .max(100, "Patient name is too long"),
  testName: z
    .string()
    .min(2, "Test name is required")
    .max(100, "Test name is too long"),
  testImage: z
    .string()
    .min(2, "Test image/icon url is required")
    .max(100, "Test image/icon url is too long"),
  type: z.enum(["single", "panel"]).default("single"),
  description: z
    .string()
    .min(2, "Description is required")
    .max(500, "Description is too long"),
  price: z.number().min(0, "Price must be a positive number"),
  currency: z
    .string()
    .min(0, "Currency is required")
    .max(10, "Currency is too long"),
  sampleType: z
    .string()
    .min(2, "Sample type is required")
    .max(100, "Sample type is too long"),
  tat: z.string().max(100, "TAT is too long").optional(),
  preparationInstructions: z
    .array(z.string().max(200, "Each instruction is too long"))
    .optional(),
  availability: z.boolean(),
});

// Inferred TypeScript type from createLabTestSchema
export type CreateLabTestSchemaInput = z.infer<typeof createLabTestSchema>;

export const addTestPanelComponentSchema = z.object({
  testId: z.string(),
  componentName: z.string(),
  unit: z.string().optional(),
  referenceRange: z.string().optional(),
});

// Inferred TypeScript type from addTestPanelComponentSchema
export type AddTestPanelComponentInput = z.infer<
  typeof addTestPanelComponentSchema
>;
