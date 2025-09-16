"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = exports.Medicine = exports.Pharmacy = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../config/database/sequelize"));
class Pharmacy extends sequelize_1.Model {
}
exports.Pharmacy = Pharmacy;
Pharmacy.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    licenseNumber: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    ownerName: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    businessType: {
        type: sequelize_1.DataTypes.ENUM('independent', 'chain', 'hospital', 'clinic'),
        allowNull: false,
    },
    operatingHours: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    services: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'verified', 'rejected', 'suspended'),
        allowNull: false,
        defaultValue: 'pending',
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "pharmacies",
    timestamps: true,
    indexes: [
        { unique: true, fields: ["email"], name: "unique_pharmacy_email" },
        { unique: true, fields: ["licenseNumber"], name: "unique_license_number" },
    ],
});
class Medicine extends sequelize_1.Model {
}
exports.Medicine = Medicine;
Medicine.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
    },
    genericName: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true,
    },
    brandName: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    dosage: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    form: {
        type: sequelize_1.DataTypes.ENUM('tablet', 'capsule', 'liquid', 'injection', 'cream', 'ointment', 'powder', 'other'),
        allowNull: false,
    },
    strength: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    unit: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    prescriptionRequired: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stockQuantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    expiryDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    batchNumber: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    manufacturer: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
    },
    sideEffects: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    interactions: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    pharmacyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pharmacy,
            key: 'id',
        },
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "medicines",
    timestamps: true,
    indexes: [
        { fields: ["pharmacyId"], name: "pharmacy_medicines_index" },
        { fields: ["category"], name: "medicine_category_index" },
        { fields: ["name"], name: "medicine_name_index" },
        { fields: ["expiryDate"], name: "medicine_expiry_index" },
    ],
});
class Inventory extends sequelize_1.Model {
}
exports.Inventory = Inventory;
Inventory.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    medicineId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Medicine,
            key: 'id',
        },
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    batchNumber: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    expiryDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    purchasePrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    sellingPrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    supplier: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
    },
    location: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    pharmacyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pharmacy,
            key: 'id',
        },
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "inventory",
    timestamps: true,
    indexes: [
        { fields: ["pharmacyId"], name: "pharmacy_inventory_index" },
        { fields: ["medicineId"], name: "medicine_inventory_index" },
        { fields: ["expiryDate"], name: "inventory_expiry_index" },
    ],
});
// Define associations
Pharmacy.hasMany(Medicine, { foreignKey: 'pharmacyId', as: 'medicines' });
Medicine.belongsTo(Pharmacy, { foreignKey: 'pharmacyId', as: 'pharmacy' });
Medicine.hasMany(Inventory, { foreignKey: 'medicineId', as: 'inventory' });
Inventory.belongsTo(Medicine, { foreignKey: 'medicineId', as: 'medicine' });
Pharmacy.hasMany(Inventory, { foreignKey: 'pharmacyId', as: 'inventory' });
Inventory.belongsTo(Pharmacy, { foreignKey: 'pharmacyId', as: 'pharmacy' });
