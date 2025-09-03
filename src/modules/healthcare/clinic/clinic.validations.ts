import { z } from "zod";

// Am creating validation schema for Clinic here
export const clinicSchema = z.object({
  // Example
  //name: z.string().min(2, "Name is required").max(50, "Name is too long"),
});

// Inferred TypeScript type from schema
export type ClinicInput = z.infer<typeof clinicSchema>;
