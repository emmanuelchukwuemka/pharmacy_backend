import { string, z } from "zod";

// Am creating validation schema for User here
export const signUpSchema = z.object({
  // healthcareUserId: z.string().min(2, "Healthcare User ID is required"),
  fullName: z.string().min(2, "Name is required").max(50, "Name is too long"),
  labName: z.string(),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  phone: z.string(),
  labAddress: z.string().min(1, "Address is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  workHours: z.string(),
  modeOfService: z.enum(["labVisit", "homeVisit"]),
  breakTime: z.string(),
});

// Inferred TypeScript type from schema
export type UserInput = z.infer<typeof signUpSchema>;

// Login schema
export const loginSchema = z.object({
  identifier: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
// Inferred TypeScript type from schema
export type LoginInput = z.infer<typeof loginSchema>;
