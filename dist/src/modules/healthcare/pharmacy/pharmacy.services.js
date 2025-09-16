"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMedicineInteractions = exports.getAuditTrail = exports.getComplianceReports = exports.getSalesAnalytics = exports.getDashboardAnalytics = exports.shipOrder = exports.processOrder = exports.getOrders = exports.getPrescriptions = exports.verifyPrescription = exports.updateInventory = exports.getInventory = exports.addInventory = exports.deleteMedicine = exports.updateMedicine = exports.getMedicines = exports.addMedicine = exports.verifyEmail = exports.verifyLicense = exports.updatePharmacyProfile = exports.getPharmacyProfile = exports.registerPharmacy = void 0;
const Pharmacy_model_1 = __importDefault(require("./pharmacy_models/Pharmacy.model"));
const User_model_1 = __importDefault(require("./pharmacy_models/User.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const nanoid_1 = require("nanoid");
const registerPharmacy = async (data) => {
    try {
        // Check if pharmacy with this email already exists
        const existingPharmacy = await Pharmacy_model_1.default.findOne({
            where: { email: data.email }
        });
        if (existingPharmacy) {
            throw new Error("Pharmacy with this email already exists");
        }
        // Check if pharmacy with this license number already exists
        const existingLicense = await Pharmacy_model_1.default.findOne({
            where: { licenseNumber: data.licenseNumber }
        });
        if (existingLicense) {
            throw new Error("Pharmacy with this license number already exists");
        }
        // Generate verification token
        const verificationToken = (0, nanoid_1.nanoid)(32);
        // Create pharmacy record
        const pharmacy = await Pharmacy_model_1.default.create({
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            licenseNumber: data.licenseNumber,
            ownerName: data.ownerName,
            businessType: data.businessType,
            operatingHours: data.operatingHours,
            services: data.services,
            status: "pending",
        });
        // Create user account for pharmacy owner
        const hashedPassword = await bcrypt_1.default.hash("temp_password_123", 12); // Temporary password
        const user = await User_model_1.default.create({
            email: data.email,
            password: hashedPassword,
            firstName: data.ownerName.split(" ")[0] || data.ownerName,
            lastName: data.ownerName.split(" ").slice(1).join(" ") || "",
            phone: data.phone,
            role: "pharmacy",
            isActive: false, // Inactive until email verification
            isVerified: false,
            verificationToken: verificationToken,
        });
        // TODO: Send verification email
        // await sendVerificationEmail(data.email, verificationToken);
        return {
            success: true,
            message: "Pharmacy registered successfully. Please check your email for verification instructions.",
            data: {
                pharmacyId: pharmacy.id,
                userId: user.id,
                name: data.name,
                email: data.email,
                status: "pending_verification",
                verificationToken: verificationToken
            },
        };
    }
    catch (error) {
        console.error("Pharmacy registration error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Pharmacy registration failed",
            data: null,
        };
    }
};
exports.registerPharmacy = registerPharmacy;
const getPharmacyProfile = async (pharmacyId) => {
    try {
        // Business logic to retrieve pharmacy profile
        // This would typically query the database for pharmacy details
        return {
            success: true,
            message: "Pharmacy profile retrieved successfully",
            data: {
                id: pharmacyId,
                name: "Sample Pharmacy",
                email: "sample@pharmacy.com",
                licenseNumber: "PHARM-12345",
                address: "123 Health Street",
                phone: "+1234567890",
                status: "verified"
            }
        };
    }
    catch (error) {
        console.error("Get pharmacy profile error:", error);
        throw new Error("Failed to retrieve pharmacy profile");
    }
};
exports.getPharmacyProfile = getPharmacyProfile;
const updatePharmacyProfile = async (pharmacyId, data) => {
    try {
        // Business logic to update pharmacy profile
        // This would typically update the database record
        return {
            success: true,
            message: "Pharmacy profile updated successfully",
            data: {
                id: pharmacyId,
                name: data.name,
                email: data.email,
                updated: true
            }
        };
    }
    catch (error) {
        console.error("Update pharmacy profile error:", error);
        throw new Error("Failed to update pharmacy profile");
    }
};
exports.updatePharmacyProfile = updatePharmacyProfile;
const verifyLicense = async (data) => {
    try {
        // Business logic for license verification
        // This would typically:
        // 1. Upload license documents
        // 2. Submit for verification
        // 3. Update verification status
        return {
            success: true,
            message: "License verification submitted",
            data: {
                verificationId: "VER-12345",
                status: "under_review",
                submittedAt: new Date().toISOString()
            }
        };
    }
    catch (error) {
        console.error("License verification error:", error);
        throw new Error("License verification failed");
    }
};
exports.verifyLicense = verifyLicense;
const verifyEmail = async (token) => {
    try {
        // Find user with the verification token
        const user = await User_model_1.default.findOne({
            where: { verificationToken: token }
        });
        if (!user) {
            throw new Error("Invalid verification token");
        }
        if (user.isVerified) {
            throw new Error("Email already verified");
        }
        // Update user verification status
        await user.update({
            isVerified: true,
            isActive: true,
            verificationToken: undefined,
        });
        // Update pharmacy status to verified
        const pharmacy = await Pharmacy_model_1.default.findOne({
            where: { email: user.email }
        });
        if (pharmacy) {
            await pharmacy.update({
                status: "verified"
            });
        }
        return {
            success: true,
            message: "Email verified successfully. Your pharmacy account is now active.",
            data: {
                userId: user.id,
                email: user.email,
                verifiedAt: new Date(),
            },
        };
    }
    catch (error) {
        console.error("Email verification error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Email verification failed",
            data: null,
        };
    }
};
exports.verifyEmail = verifyEmail;
const Medicine_model_1 = __importDefault(require("./pharmacy_models/Medicine.model"));
const Inventory_model_1 = __importDefault(require("./pharmacy_models/Inventory.model"));
const Prescription_model_1 = __importDefault(require("./pharmacy_models/Prescription.model"));
const Order_model_1 = __importDefault(require("./pharmacy_models/Order.model"));
const OrderItem_model_1 = __importDefault(require("./pharmacy_models/OrderItem.model"));
const AuditLog_model_1 = __importDefault(require("./pharmacy_models/AuditLog.model"));
const MedicineInteraction_model_1 = __importDefault(require("./pharmacy_models/MedicineInteraction.model"));
const sequelize_1 = require("sequelize");
// Medicine Management Services
const addMedicine = async (pharmacyId, data) => {
    try {
        const medicineData = {
            ...data,
            pharmacyId,
            expiryDate: new Date(data.expiryDate),
        };
        const medicine = await Medicine_model_1.default.create(medicineData);
        // Log the action
        await AuditLog_model_1.default.create({
            userId: pharmacyId,
            pharmacyId,
            action: "CREATE",
            entityType: "medicine",
            entityId: medicine.id,
            newValues: data,
        });
        return {
            success: true,
            message: "Medicine added successfully",
            data: medicine,
        };
    }
    catch (error) {
        console.error("Add medicine error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to add medicine",
            data: null,
        };
    }
};
exports.addMedicine = addMedicine;
const getMedicines = async (pharmacyId, options) => {
    try {
        const { page, limit, search, category } = options;
        const offset = (page - 1) * limit;
        const whereClause = { pharmacyId };
        if (search) {
            whereClause[sequelize_1.Op.or] = [
                { name: { [sequelize_1.Op.like]: `%${search}%` } },
                { genericName: { [sequelize_1.Op.like]: `%${search}%` } },
                { brandName: { [sequelize_1.Op.like]: `%${search}%` } },
            ];
        }
        if (category) {
            whereClause.categoryId = category;
        }
        const medicines = await Medicine_model_1.default.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: [["createdAt", "DESC"]],
        });
        return {
            success: true,
            message: "Medicines retrieved successfully",
            data: {
                medicines: medicines.rows,
                total: medicines.count,
                page,
                limit,
                totalPages: Math.ceil(medicines.count / limit),
            },
        };
    }
    catch (error) {
        console.error("Get medicines error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to fetch medicines",
            data: null,
        };
    }
};
exports.getMedicines = getMedicines;
const updateMedicine = async (pharmacyId, medicineId, data) => {
    try {
        const medicine = await Medicine_model_1.default.findOne({
            where: { id: medicineId, pharmacyId },
        });
        if (!medicine) {
            throw new Error("Medicine not found");
        }
        const oldValues = medicine.toJSON();
        await medicine.update(data);
        // Log the action
        await AuditLog_model_1.default.create({
            userId: pharmacyId,
            pharmacyId,
            action: "UPDATE",
            entityType: "medicine",
            entityId: medicineId,
            oldValues,
            newValues: data,
        });
        return {
            success: true,
            message: "Medicine updated successfully",
            data: medicine,
        };
    }
    catch (error) {
        console.error("Update medicine error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to update medicine",
            data: null,
        };
    }
};
exports.updateMedicine = updateMedicine;
const deleteMedicine = async (pharmacyId, medicineId) => {
    try {
        const medicine = await Medicine_model_1.default.findOne({
            where: { id: medicineId, pharmacyId },
        });
        if (!medicine) {
            throw new Error("Medicine not found");
        }
        await medicine.destroy();
        // Log the action
        await AuditLog_model_1.default.create({
            userId: pharmacyId,
            pharmacyId,
            action: "DELETE",
            entityType: "medicine",
            entityId: medicineId,
            oldValues: medicine.toJSON(),
        });
        return {
            success: true,
            message: "Medicine deleted successfully",
        };
    }
    catch (error) {
        console.error("Delete medicine error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to delete medicine",
            data: null,
        };
    }
};
exports.deleteMedicine = deleteMedicine;
// Inventory Management Services
const addInventory = async (pharmacyId, data) => {
    try {
        const inventory = await Inventory_model_1.default.create({
            ...data,
            pharmacyId,
        });
        return {
            success: true,
            message: "Inventory added successfully",
            data: inventory,
        };
    }
    catch (error) {
        console.error("Add inventory error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to add inventory",
            data: null,
        };
    }
};
exports.addInventory = addInventory;
const getInventory = async (pharmacyId, options) => {
    try {
        const { page, limit, search, lowStock } = options;
        const offset = (page - 1) * limit;
        const whereClause = { pharmacyId };
        if (search) {
            whereClause[sequelize_1.Op.or] = [
                { "$Medicine.name$": { [sequelize_1.Op.like]: `%${search}%` } },
                { batchNumber: { [sequelize_1.Op.like]: `%${search}%` } },
            ];
        }
        if (lowStock) {
            whereClause.quantity = { [sequelize_1.Op.lt]: 10 }; // Low stock threshold
        }
        const inventory = await Inventory_model_1.default.findAndCountAll({
            where: whereClause,
            include: [{ model: Medicine_model_1.default, as: "Medicine" }],
            limit,
            offset,
            order: [["expiryDate", "ASC"]],
        });
        return {
            success: true,
            message: "Inventory retrieved successfully",
            data: {
                inventory: inventory.rows,
                total: inventory.count,
                page,
                limit,
                totalPages: Math.ceil(inventory.count / limit),
            },
        };
    }
    catch (error) {
        console.error("Get inventory error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to fetch inventory",
            data: null,
        };
    }
};
exports.getInventory = getInventory;
const updateInventory = async (pharmacyId, inventoryId, data) => {
    try {
        const inventory = await Inventory_model_1.default.findOne({
            where: { id: inventoryId, pharmacyId },
        });
        if (!inventory) {
            throw new Error("Inventory not found");
        }
        await inventory.update(data);
        return {
            success: true,
            message: "Inventory updated successfully",
            data: inventory,
        };
    }
    catch (error) {
        console.error("Update inventory error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to update inventory",
            data: null,
        };
    }
};
exports.updateInventory = updateInventory;
// Prescription Management Services
const verifyPrescription = async (pharmacyId, data) => {
    try {
        const prescription = await Prescription_model_1.default.create({
            ...data,
            pharmacyId,
            status: "verified",
        });
        // Log the action
        await AuditLog_model_1.default.create({
            userId: pharmacyId,
            pharmacyId,
            action: "PRESCRIPTION_ACCESS",
            entityType: "prescription",
            entityId: prescription.id,
            newValues: data,
            complianceFlag: true,
        });
        return {
            success: true,
            message: "Prescription verified successfully",
            data: prescription,
        };
    }
    catch (error) {
        console.error("Prescription verification error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Prescription verification failed",
            data: null,
        };
    }
};
exports.verifyPrescription = verifyPrescription;
const getPrescriptions = async (pharmacyId, options) => {
    try {
        const { page, limit, status } = options;
        const offset = (page - 1) * limit;
        const whereClause = { pharmacyId };
        if (status) {
            whereClause.status = status;
        }
        const prescriptions = await Prescription_model_1.default.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: [["createdAt", "DESC"]],
        });
        return {
            success: true,
            message: "Prescriptions retrieved successfully",
            data: {
                prescriptions: prescriptions.rows,
                total: prescriptions.count,
                page,
                limit,
                totalPages: Math.ceil(prescriptions.count / limit),
            },
        };
    }
    catch (error) {
        console.error("Get prescriptions error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to fetch prescriptions",
            data: null,
        };
    }
};
exports.getPrescriptions = getPrescriptions;
// Order Management Services
const getOrders = async (pharmacyId, options) => {
    try {
        const { page, limit, status, search } = options;
        const offset = (page - 1) * limit;
        const whereClause = { pharmacyId };
        if (status) {
            whereClause.status = status;
        }
        if (search) {
            whereClause[sequelize_1.Op.or] = [
                { orderNumber: { [sequelize_1.Op.like]: `%${search}%` } },
                { "$Customer.firstName$": { [sequelize_1.Op.like]: `%${search}%` } },
                { "$Customer.lastName$": { [sequelize_1.Op.like]: `%${search}%` } },
            ];
        }
        const orders = await Order_model_1.default.findAndCountAll({
            where: whereClause,
            include: [{ model: OrderItem_model_1.default, as: "OrderItems" }],
            limit,
            offset,
            order: [["createdAt", "DESC"]],
        });
        return {
            success: true,
            message: "Orders retrieved successfully",
            data: {
                orders: orders.rows,
                total: orders.count,
                page,
                limit,
                totalPages: Math.ceil(orders.count / limit),
            },
        };
    }
    catch (error) {
        console.error("Get orders error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to fetch orders",
            data: null,
        };
    }
};
exports.getOrders = getOrders;
const processOrder = async (pharmacyId, orderId, data) => {
    try {
        const order = await Order_model_1.default.findOne({
            where: { id: orderId, pharmacyId },
        });
        if (!order) {
            throw new Error("Order not found");
        }
        await order.update({
            status: "processing",
            ...data,
        });
        // Log the action
        await AuditLog_model_1.default.create({
            userId: pharmacyId,
            pharmacyId,
            action: "ORDER_PROCESSING",
            entityType: "order",
            entityId: orderId,
            newValues: { status: "processing", ...data },
        });
        return {
            success: true,
            message: "Order processed successfully",
            data: order,
        };
    }
    catch (error) {
        console.error("Process order error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Order processing failed",
            data: null,
        };
    }
};
exports.processOrder = processOrder;
const shipOrder = async (pharmacyId, orderId, data) => {
    try {
        const order = await Order_model_1.default.findOne({
            where: { id: orderId, pharmacyId },
        });
        if (!order) {
            throw new Error("Order not found");
        }
        await order.update({
            status: "shipped",
            ...data,
        });
        // Log the action
        await AuditLog_model_1.default.create({
            userId: pharmacyId,
            pharmacyId,
            action: "ORDER_PROCESSING",
            entityType: "order",
            entityId: orderId,
            newValues: { status: "shipped", ...data },
        });
        return {
            success: true,
            message: "Order shipped successfully",
            data: order,
        };
    }
    catch (error) {
        console.error("Ship order error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Order shipping failed",
            data: null,
        };
    }
};
exports.shipOrder = shipOrder;
// Analytics Services
const getDashboardAnalytics = async (pharmacyId, period) => {
    try {
        // Calculate date range based on period
        const endDate = new Date();
        const startDate = new Date();
        switch (period) {
            case "7d":
                startDate.setDate(endDate.getDate() - 7);
                break;
            case "30d":
                startDate.setDate(endDate.getDate() - 30);
                break;
            case "90d":
                startDate.setDate(endDate.getDate() - 90);
                break;
            default:
                startDate.setDate(endDate.getDate() - 30);
        }
        // Get order statistics
        const orderStats = await Order_model_1.default.findAll({
            where: {
                pharmacyId,
                createdAt: { [sequelize_1.Op.between]: [startDate, endDate] },
            },
            attributes: [
                [(0, sequelize_1.fn)("COUNT", (0, sequelize_1.col)("id")), "totalOrders"],
                [(0, sequelize_1.fn)("SUM", (0, sequelize_1.col)("totalAmount")), "totalRevenue"],
            ],
            raw: true,
        });
        // Get medicine statistics
        const medicineStats = await Medicine_model_1.default.count({
            where: { pharmacyId },
        });
        // Get low stock alerts
        const lowStockCount = await Inventory_model_1.default.count({
            where: {
                pharmacyId,
                quantity: { [sequelize_1.Op.lt]: 10 },
            },
        });
        return {
            success: true,
            message: "Dashboard analytics retrieved successfully",
            data: {
                period,
                orderStats: orderStats[0] || { totalOrders: 0, totalRevenue: 0 },
                medicineStats,
                lowStockCount,
                dateRange: { startDate, endDate },
            },
        };
    }
    catch (error) {
        console.error("Get dashboard analytics error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to fetch analytics",
            data: null,
        };
    }
};
exports.getDashboardAnalytics = getDashboardAnalytics;
const getSalesAnalytics = async (pharmacyId, options) => {
    try {
        const { startDate, endDate } = options;
        const sales = await Order_model_1.default.findAll({
            where: {
                pharmacyId,
                createdAt: { [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)] },
                status: "completed",
            },
            attributes: [
                [(0, sequelize_1.fn)("DATE", (0, sequelize_1.col)("createdAt")), "date"],
                [(0, sequelize_1.fn)("COUNT", (0, sequelize_1.col)("id")), "orders"],
                [(0, sequelize_1.fn)("SUM", (0, sequelize_1.col)("totalAmount")), "revenue"],
            ],
            group: [(0, sequelize_1.fn)("DATE", (0, sequelize_1.col)("createdAt"))],
            order: [[(0, sequelize_1.fn)("DATE", (0, sequelize_1.col)("createdAt")), "ASC"]],
            raw: true,
        });
        return {
            success: true,
            message: "Sales analytics retrieved successfully",
            data: {
                sales,
                dateRange: { startDate, endDate },
            },
        };
    }
    catch (error) {
        console.error("Get sales analytics error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to fetch sales analytics",
            data: null,
        };
    }
};
exports.getSalesAnalytics = getSalesAnalytics;
// Compliance Services
const getComplianceReports = async (pharmacyId, options) => {
    try {
        const { type, period } = options;
        let reports = [];
        switch (type) {
            case "prescription":
                reports = await Prescription_model_1.default.findAll({
                    where: { pharmacyId },
                    limit: 100,
                    order: [["createdAt", "DESC"]],
                });
                break;
            case "audit":
                reports = await AuditLog_model_1.default.findAll({
                    where: { pharmacyId, complianceFlag: true },
                    limit: 100,
                    order: [["timestamp", "DESC"]],
                });
                break;
            default:
                reports = await AuditLog_model_1.default.findAll({
                    where: { pharmacyId },
                    limit: 100,
                    order: [["timestamp", "DESC"]],
                });
        }
        return {
            success: true,
            message: "Compliance reports retrieved successfully",
            data: {
                type,
                reports,
                total: reports.length,
            },
        };
    }
    catch (error) {
        console.error("Get compliance reports error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to fetch compliance reports",
            data: null,
        };
    }
};
exports.getComplianceReports = getComplianceReports;
const getAuditTrail = async (pharmacyId, options) => {
    try {
        const { page, limit, action, entityType } = options;
        const offset = (page - 1) * limit;
        const whereClause = { pharmacyId };
        if (action) {
            whereClause.action = action;
        }
        if (entityType) {
            whereClause.entityType = entityType;
        }
        const auditLogs = await AuditLog_model_1.default.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: [["timestamp", "DESC"]],
        });
        return {
            success: true,
            message: "Audit trail retrieved successfully",
            data: {
                auditLogs: auditLogs.rows,
                total: auditLogs.count,
                page,
                limit,
                totalPages: Math.ceil(auditLogs.count / limit),
            },
        };
    }
    catch (error) {
        console.error("Get audit trail error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to fetch audit trail",
            data: null,
        };
    }
};
exports.getAuditTrail = getAuditTrail;
// Medicine Interaction Check
const checkMedicineInteractions = async (medicineIds) => {
    try {
        const interactions = await MedicineInteraction_model_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { medicineId: { [sequelize_1.Op.in]: medicineIds } },
                    { interactingMedicineId: { [sequelize_1.Op.in]: medicineIds } },
                ],
            },
            include: [
                { model: Medicine_model_1.default, as: "Medicine" },
                { model: Medicine_model_1.default, as: "InteractingMedicine" },
            ],
        });
        return {
            success: true,
            message: "Medicine interactions checked successfully",
            data: {
                interactions,
                hasInteractions: interactions.length > 0,
            },
        };
    }
    catch (error) {
        console.error("Check medicine interactions error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Interaction check failed",
            data: null,
        };
    }
};
exports.checkMedicineInteractions = checkMedicineInteractions;
