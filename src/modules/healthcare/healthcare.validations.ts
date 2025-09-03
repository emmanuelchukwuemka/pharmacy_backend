import { z } from "zod";

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
