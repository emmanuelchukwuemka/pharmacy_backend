"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicineVariation = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
class MedicineVariation extends sequelize_1.Model {
}
exports.MedicineVariation = MedicineVariation;
MedicineVariation.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    medicineId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    dosage: {
        type: sequelize_1.DataTypes.STRING(50),
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
    form: {
        type: sequelize_1.DataTypes.ENUM('tablet', 'capsule', 'liquid', 'injection', 'cream', 'ointment', 'powder', 'other'),
        allowNull: false,
    },
    packagingType: {
        type: sequelize_1.DataTypes.ENUM('bottle', 'strip', 'box', 'tube', 'vial', 'sachet', 'other'),
        allowNull: false,
    },
    packagingSize: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    sku: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    costPrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stockQuantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    minStockLevel: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
    },
    maxStockLevel: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1000,
    },
    reorderPoint: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 50,
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
    prescriptionRequired: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    controlledSubstance: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
    tableName: "medicine_variations",
    timestamps: true,
    indexes: [
        { unique: true, fields: ["sku"], name: "unique_medicine_sku" },
        { fields: ["medicineId"], name: "medicine_variation_medicine_index" },
        { fields: ["form"], name: "medicine_variation_form_index" },
        { fields: ["expiryDate"], name: "medicine_variation_expiry_index" },
        { fields: ["batchNumber"], name: "medicine_variation_batch_index" },
    ],
});
exports.default = MedicineVariation;
