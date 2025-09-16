"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medicine = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
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
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
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
exports.default = Medicine;
