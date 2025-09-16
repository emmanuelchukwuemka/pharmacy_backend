"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pharmacy = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
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
exports.default = Pharmacy;
