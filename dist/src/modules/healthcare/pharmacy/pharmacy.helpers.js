"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSuccessResponse = exports.createErrorResponse = exports.processBatchUpdate = exports.generateExpiryAlert = exports.generateLowStockAlert = exports.filterMedicinesByPrescription = exports.filterMedicinesByCategory = exports.searchMedicines = exports.calculateAverageOrderValue = exports.calculateRevenueGrowth = exports.validateFileSize = exports.validateFileType = exports.generateFileName = exports.formatDateTime = exports.formatDate = exports.calculateTax = exports.calculateDiscount = exports.calculateOrderTotal = exports.checkExpiringMedicines = exports.checkLowStock = exports.validateMedicineData = exports.isValidEmail = exports.validatePharmacyData = exports.verifyToken = exports.generateToken = exports.verifyPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Password hashing helper
const hashPassword = async (password) => {
    const saltRounds = 12;
    return await bcrypt_1.default.hash(password, saltRounds);
};
exports.hashPassword = hashPassword;
// Password verification helper
const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt_1.default.compare(password, hashedPassword);
};
exports.verifyPassword = verifyPassword;
// JWT token generation helper
const generateToken = (payload) => {
    const secret = process.env.JWT_SECRET || "default_secret";
    const expiresIn = 86400; // 24 hours in seconds
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
};
exports.generateToken = generateToken;
// JWT token verification helper
const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET || "default_secret";
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
// Pharmacy validation helpers
const validatePharmacyData = (data) => {
    const errors = [];
    if (!data.name || data.name.length < 2) {
        errors.push("Pharmacy name must be at least 2 characters long");
    }
    if (!data.email || !(0, exports.isValidEmail)(data.email)) {
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
exports.validatePharmacyData = validatePharmacyData;
// Email validation helper
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.isValidEmail = isValidEmail;
// Medicine validation helpers
const validateMedicineData = (data) => {
    const errors = [];
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
exports.validateMedicineData = validateMedicineData;
// Inventory management helpers
const checkLowStock = (inventory, threshold = 10) => {
    return inventory.filter(item => item.quantity <= threshold);
};
exports.checkLowStock = checkLowStock;
const checkExpiringMedicines = (inventory, daysAhead = 30) => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysAhead);
    return inventory.filter(item => new Date(item.expiryDate) <= futureDate);
};
exports.checkExpiringMedicines = checkExpiringMedicines;
// Order calculation helpers
const calculateOrderTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};
exports.calculateOrderTotal = calculateOrderTotal;
const calculateDiscount = (total, discountPercent) => {
    return (total * discountPercent) / 100;
};
exports.calculateDiscount = calculateDiscount;
const calculateTax = (total, taxPercent) => {
    return (total * taxPercent) / 100;
};
exports.calculateTax = calculateTax;
// Date formatting helpers
const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};
exports.formatDate = formatDate;
const formatDateTime = (date) => {
    return date.toISOString();
};
exports.formatDateTime = formatDateTime;
// File upload helpers
const generateFileName = (originalName, prefix = "") => {
    const timestamp = Date.now();
    const extension = originalName.split('.').pop();
    return `${prefix}${timestamp}.${extension}`;
};
exports.generateFileName = generateFileName;
const validateFileType = (mimetype, allowedTypes) => {
    return allowedTypes.includes(mimetype);
};
exports.validateFileType = validateFileType;
const validateFileSize = (size, maxSize) => {
    return size <= maxSize;
};
exports.validateFileSize = validateFileSize;
// Analytics helpers
const calculateRevenueGrowth = (currentRevenue, previousRevenue) => {
    if (previousRevenue === 0)
        return 100;
    return ((currentRevenue - previousRevenue) / previousRevenue) * 100;
};
exports.calculateRevenueGrowth = calculateRevenueGrowth;
const calculateAverageOrderValue = (totalRevenue, totalOrders) => {
    if (totalOrders === 0)
        return 0;
    return totalRevenue / totalOrders;
};
exports.calculateAverageOrderValue = calculateAverageOrderValue;
// Search and filter helpers
const searchMedicines = (medicines, query) => {
    const lowercaseQuery = query.toLowerCase();
    return medicines.filter(medicine => medicine.name.toLowerCase().includes(lowercaseQuery) ||
        medicine.genericName?.toLowerCase().includes(lowercaseQuery) ||
        medicine.brandName?.toLowerCase().includes(lowercaseQuery) ||
        medicine.category.toLowerCase().includes(lowercaseQuery));
};
exports.searchMedicines = searchMedicines;
const filterMedicinesByCategory = (medicines, category) => {
    return medicines.filter(medicine => medicine.category === category);
};
exports.filterMedicinesByCategory = filterMedicinesByCategory;
const filterMedicinesByPrescription = (medicines, requiresPrescription) => {
    return medicines.filter(medicine => medicine.prescriptionRequired === requiresPrescription);
};
exports.filterMedicinesByPrescription = filterMedicinesByPrescription;
// Notification helpers
const generateLowStockAlert = (medicine) => {
    return `Low stock alert: ${medicine.name} has only ${medicine.stockQuantity} units remaining`;
};
exports.generateLowStockAlert = generateLowStockAlert;
const generateExpiryAlert = (medicine, daysUntilExpiry) => {
    return `Expiry alert: ${medicine.name} will expire in ${daysUntilExpiry} days`;
};
exports.generateExpiryAlert = generateExpiryAlert;
// Batch processing helpers
const processBatchUpdate = async (items, batchSize, processor) => {
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        await processor(batch);
    }
};
exports.processBatchUpdate = processBatchUpdate;
// Error handling helpers
const createErrorResponse = (message, code = "INTERNAL_ERROR") => {
    return {
        success: false,
        message,
        code,
        timestamp: new Date().toISOString()
    };
};
exports.createErrorResponse = createErrorResponse;
const createSuccessResponse = (message, data) => {
    return {
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
    };
};
exports.createSuccessResponse = createSuccessResponse;
