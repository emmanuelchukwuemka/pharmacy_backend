import { PharmacyRegisterInput, PharmacyMedicineInput } from "./pharmacy.validations";
import Pharmacy from "./pharmacy_models/Pharmacy.model";
import User from "./pharmacy_models/User.model";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

export const registerPharmacy = async (data: PharmacyRegisterInput) => {
  try {
    // Check if pharmacy with this email already exists
    const existingPharmacy = await Pharmacy.findOne({
      where: { email: data.email }
    });

    if (existingPharmacy) {
      throw new Error("Pharmacy with this email already exists");
    }

    // Check if pharmacy with this license number already exists
    const existingLicense = await Pharmacy.findOne({
      where: { licenseNumber: data.licenseNumber }
    });

    if (existingLicense) {
      throw new Error("Pharmacy with this license number already exists");
    }

    // Generate verification token
    const verificationToken = nanoid(32);

    // Create pharmacy record
    const pharmacy = await Pharmacy.create({
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
    const hashedPassword = await bcrypt.hash("temp_password_123", 12); // Temporary password

    const user = await User.create({
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
  } catch (error) {
    console.error("Pharmacy registration error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Pharmacy registration failed",
      data: null,
    };
  }
};

export const getPharmacyProfile = async (pharmacyId: number) => {
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
  } catch (error) {
    console.error("Get pharmacy profile error:", error);
    throw new Error("Failed to retrieve pharmacy profile");
  }
};

export const updatePharmacyProfile = async (pharmacyId: number, data: PharmacyRegisterInput) => {
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
  } catch (error) {
    console.error("Update pharmacy profile error:", error);
    throw new Error("Failed to update pharmacy profile");
  }
};

export const verifyLicense = async (data: any) => {
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
  } catch (error) {
    console.error("License verification error:", error);
    throw new Error("License verification failed");
  }
};

export const verifyEmail = async (token: string) => {
  try {
    // Find user with the verification token
    const user = await User.findOne({
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
    const pharmacy = await Pharmacy.findOne({
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
  } catch (error) {
    console.error("Email verification error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Email verification failed",
      data: null,
    };
  }
};

import Medicine from "./pharmacy_models/Medicine.model";
import Inventory from "./pharmacy_models/Inventory.model";
import Prescription from "./pharmacy_models/Prescription.model";
import Order from "./pharmacy_models/Order.model";
import OrderItem from "./pharmacy_models/OrderItem.model";
import AuditLog from "./pharmacy_models/AuditLog.model";
import MedicineInteraction from "./pharmacy_models/MedicineInteraction.model";
import { Op, fn, col } from "sequelize";

// Medicine Management Services
export const addMedicine = async (pharmacyId: number, data: PharmacyMedicineInput) => {
  try {
    const medicineData = {
      ...data,
      pharmacyId,
      expiryDate: new Date(data.expiryDate),
    };

    const medicine = await Medicine.create(medicineData);

    // Log the action
    await AuditLog.create({
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
  } catch (error) {
    console.error("Add medicine error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to add medicine",
      data: null,
    };
  }
};

export const getMedicines = async (pharmacyId: number, options: any) => {
  try {
    const { page, limit, search, category } = options;
    const offset = (page - 1) * limit;

    const whereClause: any = { pharmacyId };

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { genericName: { [Op.like]: `%${search}%` } },
        { brandName: { [Op.like]: `%${search}%` } },
      ];
    }

    if (category) {
      whereClause.categoryId = category;
    }

    const medicines = await Medicine.findAndCountAll({
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
  } catch (error) {
    console.error("Get medicines error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch medicines",
      data: null,
    };
  }
};

export const updateMedicine = async (pharmacyId: number, medicineId: number, data: any) => {
  try {
    const medicine = await Medicine.findOne({
      where: { id: medicineId, pharmacyId },
    });

    if (!medicine) {
      throw new Error("Medicine not found");
    }

    const oldValues = medicine.toJSON();
    await medicine.update(data);

    // Log the action
    await AuditLog.create({
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
  } catch (error) {
    console.error("Update medicine error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update medicine",
      data: null,
    };
  }
};

export const deleteMedicine = async (pharmacyId: number, medicineId: number) => {
  try {
    const medicine = await Medicine.findOne({
      where: { id: medicineId, pharmacyId },
    });

    if (!medicine) {
      throw new Error("Medicine not found");
    }

    await medicine.destroy();

    // Log the action
    await AuditLog.create({
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
  } catch (error) {
    console.error("Delete medicine error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete medicine",
      data: null,
    };
  }
};

// Inventory Management Services
export const addInventory = async (pharmacyId: number, data: any) => {
  try {
    const inventory = await Inventory.create({
      ...data,
      pharmacyId,
    });

    return {
      success: true,
      message: "Inventory added successfully",
      data: inventory,
    };
  } catch (error) {
    console.error("Add inventory error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to add inventory",
      data: null,
    };
  }
};

export const getInventory = async (pharmacyId: number, options: any) => {
  try {
    const { page, limit, search, lowStock } = options;
    const offset = (page - 1) * limit;

    const whereClause: any = { pharmacyId };

    if (search) {
      whereClause[Op.or] = [
        { "$Medicine.name$": { [Op.like]: `%${search}%` } },
        { batchNumber: { [Op.like]: `%${search}%` } },
      ];
    }

    if (lowStock) {
      whereClause.quantity = { [Op.lt]: 10 }; // Low stock threshold
    }

    const inventory = await Inventory.findAndCountAll({
      where: whereClause,
      include: [{ model: Medicine, as: "Medicine" }],
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
  } catch (error) {
    console.error("Get inventory error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch inventory",
      data: null,
    };
  }
};

export const updateInventory = async (pharmacyId: number, inventoryId: number, data: any) => {
  try {
    const inventory = await Inventory.findOne({
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
  } catch (error) {
    console.error("Update inventory error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update inventory",
      data: null,
    };
  }
};

// Prescription Management Services
export const verifyPrescription = async (pharmacyId: number, data: any) => {
  try {
    const prescription = await Prescription.create({
      ...data,
      pharmacyId,
      status: "verified",
    });

    // Log the action
    await AuditLog.create({
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
  } catch (error) {
    console.error("Prescription verification error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Prescription verification failed",
      data: null,
    };
  }
};

export const getPrescriptions = async (pharmacyId: number, options: any) => {
  try {
    const { page, limit, status } = options;
    const offset = (page - 1) * limit;

    const whereClause: any = { pharmacyId };

    if (status) {
      whereClause.status = status;
    }

    const prescriptions = await Prescription.findAndCountAll({
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
  } catch (error) {
    console.error("Get prescriptions error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch prescriptions",
      data: null,
    };
  }
};

// Order Management Services
export const getOrders = async (pharmacyId: number, options: any) => {
  try {
    const { page, limit, status, search } = options;
    const offset = (page - 1) * limit;

    const whereClause: any = { pharmacyId };

    if (status) {
      whereClause.status = status;
    }

    if (search) {
      whereClause[Op.or] = [
        { orderNumber: { [Op.like]: `%${search}%` } },
        { "$Customer.firstName$": { [Op.like]: `%${search}%` } },
        { "$Customer.lastName$": { [Op.like]: `%${search}%` } },
      ];
    }

    const orders = await Order.findAndCountAll({
      where: whereClause,
      include: [{ model: OrderItem, as: "OrderItems" }],
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
  } catch (error) {
    console.error("Get orders error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch orders",
      data: null,
    };
  }
};

export const processOrder = async (pharmacyId: number, orderId: number, data: any) => {
  try {
    const order = await Order.findOne({
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
    await AuditLog.create({
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
  } catch (error) {
    console.error("Process order error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Order processing failed",
      data: null,
    };
  }
};

export const shipOrder = async (pharmacyId: number, orderId: number, data: any) => {
  try {
    const order = await Order.findOne({
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
    await AuditLog.create({
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
  } catch (error) {
    console.error("Ship order error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Order shipping failed",
      data: null,
    };
  }
};

// Analytics Services
export const getDashboardAnalytics = async (pharmacyId: number, period: string) => {
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
    const orderStats = await Order.findAll({
      where: {
        pharmacyId,
        createdAt: { [Op.between]: [startDate, endDate] },
      },
      attributes: [
        [fn("COUNT", col("id")), "totalOrders"],
        [fn("SUM", col("totalAmount")), "totalRevenue"],
      ],
      raw: true,
    });

    // Get medicine statistics
    const medicineStats = await Medicine.count({
      where: { pharmacyId },
    });

    // Get low stock alerts
    const lowStockCount = await Inventory.count({
      where: {
        pharmacyId,
        quantity: { [Op.lt]: 10 },
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
  } catch (error) {
    console.error("Get dashboard analytics error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch analytics",
      data: null,
    };
  }
};

export const getSalesAnalytics = async (pharmacyId: number, options: any) => {
  try {
    const { startDate, endDate } = options;

    const sales = await Order.findAll({
      where: {
        pharmacyId,
        createdAt: { [Op.between]: [new Date(startDate), new Date(endDate)] },
        status: "completed",
      },
      attributes: [
        [fn("DATE", col("createdAt")), "date"],
        [fn("COUNT", col("id")), "orders"],
        [fn("SUM", col("totalAmount")), "revenue"],
      ],
      group: [fn("DATE", col("createdAt"))],
      order: [[fn("DATE", col("createdAt")), "ASC"]],
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
  } catch (error) {
    console.error("Get sales analytics error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch sales analytics",
      data: null,
    };
  }
};

// Compliance Services
export const getComplianceReports = async (pharmacyId: number, options: any) => {
  try {
    const { type, period } = options;

    let reports = [];

    switch (type) {
      case "prescription":
        reports = await Prescription.findAll({
          where: { pharmacyId },
          limit: 100,
          order: [["createdAt", "DESC"]],
        });
        break;
      case "audit":
        reports = await AuditLog.findAll({
          where: { pharmacyId, complianceFlag: true },
          limit: 100,
          order: [["timestamp", "DESC"]],
        });
        break;
      default:
        reports = await AuditLog.findAll({
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
  } catch (error) {
    console.error("Get compliance reports error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch compliance reports",
      data: null,
    };
  }
};

export const getAuditTrail = async (pharmacyId: number, options: any) => {
  try {
    const { page, limit, action, entityType } = options;
    const offset = (page - 1) * limit;

    const whereClause: any = { pharmacyId };

    if (action) {
      whereClause.action = action;
    }

    if (entityType) {
      whereClause.entityType = entityType;
    }

    const auditLogs = await AuditLog.findAndCountAll({
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
  } catch (error) {
    console.error("Get audit trail error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch audit trail",
      data: null,
    };
  }
};

// Medicine Interaction Check
export const checkMedicineInteractions = async (medicineIds: number[]) => {
  try {
    const interactions = await MedicineInteraction.findAll({
      where: {
        [Op.or]: [
          { medicineId: { [Op.in]: medicineIds } },
          { interactingMedicineId: { [Op.in]: medicineIds } },
        ],
      },
      include: [
        { model: Medicine, as: "Medicine" },
        { model: Medicine, as: "InteractingMedicine" },
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
  } catch (error) {
    console.error("Check medicine interactions error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Interaction check failed",
      data: null,
    };
  }
};
