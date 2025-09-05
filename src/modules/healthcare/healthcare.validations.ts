import { email, z } from "zod";

// SIGN UP VALIDATION
export const healthcareSignUpSchema = z.object({
  bloomzonUserId: z.string().min(3),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  phone: z.string().min(7),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
});

export type HealthcareUserInput = z.infer<typeof healthcareSignUpSchema>;

// LOGIN VALIDATION
export const healthcareLoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  password: z.string().min(6),
});

export type HealthcareLoginInput = z.infer<typeof healthcareLoginSchema>;

// CREATE PATIENT VALIDATION
export const createPatientSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  age: z.number().min(0, "Age must be a positive number"),
  sex: z.enum(["male", "female", "other"]),
  phoneNumber: z.string().min(7).optional(),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
    .optional(),
  nationality: z.string().min(2, "must be at least 2 characters"),
  stateOfOrigin: z.string().min(2, "must be at least 2 characters"),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  allergies: z.array(z.string()).optional().nullable(),
  medicalHistory: z.string().optional().nullable(),
  emergencyContact: z.string().min(7).optional(),
});

export type CreatePatientInput = z.infer<typeof createPatientSchema>;
