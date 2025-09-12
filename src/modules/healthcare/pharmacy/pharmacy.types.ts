// Pharmacy entity types
export interface Pharmacy {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  licenseNumber: string;
  ownerName: string;
  businessType: 'independent' | 'chain' | 'hospital' | 'clinic';
  operatingHours: OperatingHours;
  services: string[];
  status: 'pending' | 'verified' | 'rejected' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

export interface OperatingHours {
  monday: { open: string; close: string };
  tuesday: { open: string; close: string };
  wednesday: { open: string; close: string };
  thursday: { open: string; close: string };
  friday: { open: string; close: string };
  saturday: { open: string; close: string };
  sunday: { open: string; close: string };
}

// Medicine entity types
export interface Medicine {
  id: number;
  name: string;
  genericName?: string;
  brandName?: string;
  description: string;
  category: string;
  dosage: string;
  form: 'tablet' | 'capsule' | 'liquid' | 'injection' | 'cream' | 'ointment' | 'powder' | 'other';
  strength: string;
  unit: string;
  prescriptionRequired: boolean;
  price: number;
  stockQuantity: number;
  expiryDate: Date;
  batchNumber: string;
  manufacturer: string;
  sideEffects?: string[];
  interactions?: string[];
  pharmacyId: number;
  createdAt: Date;
  updatedAt: Date;
}

// Inventory entity types
export interface Inventory {
  id: number;
  medicineId: number;
  quantity: number;
  batchNumber: string;
  expiryDate: Date;
  purchasePrice: number;
  sellingPrice: number;
  supplier: string;
  location: string;
  pharmacyId: number;
  createdAt: Date;
  updatedAt: Date;
}

// Order entity types
export interface Order {
  id: number;
  customerId: number;
  pharmacyId: number;
  items: OrderItem[];
  prescriptionId?: number;
  deliveryAddress: string;
  deliveryMethod: 'pickup' | 'delivery' | 'express';
  paymentMethod: 'cash' | 'card' | 'insurance' | 'online';
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: number;
  orderId: number;
  medicineId: number;
  quantity: number;
  price: number;
  total: number;
}

// Prescription entity types
export interface Prescription {
  id: number;
  prescriptionNumber: string;
  patientName: string;
  doctorName: string;
  medicines: PrescriptionMedicine[];
  issueDate: Date;
  expiryDate: Date;
  status: 'pending' | 'verified' | 'rejected';
  pharmacyId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrescriptionMedicine {
  name: string;
  dosage: string;
  quantity: number;
  instructions: string;
}

// License verification types
export interface LicenseVerification {
  id: number;
  pharmacyId: number;
  licenseNumber: string;
  documentUrl: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  reviewerComments?: string;
  submittedAt: Date;
  reviewedAt?: Date;
}

// Analytics types
export interface PharmacyAnalytics {
  totalOrders: number;
  totalRevenue: number;
  totalMedicines: number;
  lowStockAlerts: number;
  expiringMedicines: number;
  monthlyRevenue: MonthlyRevenue[];
  topSellingMedicines: TopSellingMedicine[];
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  orders: number;
}

export interface TopSellingMedicine {
  medicineId: number;
  name: string;
  soldQuantity: number;
  revenue: number;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Request types for controllers
export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    pharmacyId: number;
    email: string;
    userType: string;
  };
}

// Service response types
export interface ServiceResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
