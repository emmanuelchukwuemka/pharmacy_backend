import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Pharmacy, Medicine, Inventory, Order } from "./pharmacy.types";

// Password hashing helper
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// Password verification helper
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// JWT token generation helper
export const generateToken = (payload: object): string => {
  const secret = process.env.JWT_SECRET || "default_secret";
  const expiresIn = process.env.JWT_EXPIRES_IN || "24h";
  return jwt.sign(payload, secret, { expiresIn });
};

// JWT token verification helper
export const verifyToken = (token: string): any => {
  const secret = process.env.JWT_SECRET || "default_secret";
  return jwt.verify(token, secret);
};

// Pharmacy validation helpers
export const validatePharmacyData = (data: Partial<Pharmacy>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name || data.name.length < 2) {
    errors.push("Pharmacy name must be at least 2 characters long");
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Valid email is required");
  }

  if (!data.phone || data.phone.length < 10) {
    errors.push("Valid phone number is required");
  }

  if (!data.licenseNumber || data.licenseNumber.length < 5) {
    errors.push("Valid license number is required");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Email validation helper
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Medicine validation helpers
export const validateMedicineData = (data: Partial<Medicine>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name || data.name.length < 2) {
    errors.push("Medicine name must be at least 2 characters long");
  }

  if (!data.dosage) {
    errors.push("Dosage is required");
  }

  if (!data.form) {
    errors.push("Medicine form is required");
  }

  if (!data.strength) {
    errors.push("Medicine strength is required");
  }

  if (data.price && data.price <= 0) {
    errors.push("Price must be positive");
  }

  if (data.stockQuantity && data.stockQuantity < 0) {
    errors.push("Stock quantity cannot be negative");
  }

  if (data.expiryDate && new Date(data.expiryDate) <= new Date()) {
    errors.push("Expiry date must be in the future");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Inventory management helpers
export const checkLowStock = (inventory: Inventory[], threshold: number = 10): Inventory[] => {
  return inventory.filter(item => item.quantity <= threshold);
};

export const checkExpiringMedicines = (inventory: Inventory[], daysAhead: number = 30): Inventory[] => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + daysAhead);

  return inventory.filter(item => new Date(item.expiryDate) <= futureDate);
};

// Order calculation helpers
export const calculateOrderTotal = (items: { price: number; quantity: number }[]): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const calculateDiscount = (total: number, discountPercent: number): number => {
  return (total * discountPercent) / 100;
};

export const calculateTax = (total: number, taxPercent: number): number => {
  return (total * taxPercent) / 100;
};

// Date formatting helpers
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const formatDateTime = (date: Date): string => {
  return date.toISOString();
};

// File upload helpers
export const generateFileName = (originalName: string, prefix: string = ""): string => {
  const timestamp = Date.now();
  const extension = originalName.split('.').pop();
  return `${prefix}${timestamp}.${extension}`;
};

export const validateFileType = (mimetype: string, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(mimetype);
};

export const validateFileSize = (size: number, maxSize: number): boolean => {
  return size <= maxSize;
};

// Analytics helpers
export const calculateRevenueGrowth = (currentRevenue: number, previousRevenue: number): number => {
  if (previousRevenue === 0) return 100;
  return ((currentRevenue - previousRevenue) / previousRevenue) * 100;
};

export const calculateAverageOrderValue = (totalRevenue: number, totalOrders: number): number => {
  if (totalOrders === 0) return 0;
  return totalRevenue / totalOrders;
};

// Search and filter helpers
export const searchMedicines = (medicines: Medicine[], query: string): Medicine[] => {
  const lowercaseQuery = query.toLowerCase();
  return medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(lowercaseQuery) ||
    medicine.genericName?.toLowerCase().includes(lowercaseQuery) ||
    medicine.brandName?.toLowerCase().includes(lowercaseQuery) ||
    medicine.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const filterMedicinesByCategory = (medicines: Medicine[], category: string): Medicine[] => {
  return medicines.filter(medicine => medicine.category === category);
};

export const filterMedicinesByPrescription = (medicines: Medicine[], requiresPrescription: boolean): Medicine[] => {
  return medicines.filter(medicine => medicine.prescriptionRequired === requiresPrescription);
};

// Notification helpers
export const generateLowStockAlert = (medicine: Medicine): string => {
  return `Low stock alert: ${medicine.name} has only ${medicine.stockQuantity} units remaining`;
};

export const generateExpiryAlert = (medicine: Medicine, daysUntilExpiry: number): string => {
  return `Expiry alert: ${medicine.name} will expire in ${daysUntilExpiry} days`;
};

// Batch processing helpers
export const processBatchUpdate = async <T>(
  items: T[],
  batchSize: number,
  processor: (batch: T[]) => Promise<void>
): Promise<void> => {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await processor(batch);
  }
};

// Error handling helpers
export const createErrorResponse = (message: string, code: string = "INTERNAL_ERROR"): object => {
  return {
    success: false,
    message,
    code,
    timestamp: new Date().toISOString()
  };
};

export const createSuccessResponse = (message: string, data?: any): object => {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  };
};
