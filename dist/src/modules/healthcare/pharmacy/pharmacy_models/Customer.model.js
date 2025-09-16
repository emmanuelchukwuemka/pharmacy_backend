"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
class Customer extends sequelize_1.Model {
}
exports.Customer = Customer;
Customer.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: "users",
            key: "id",
        },
    },
    dateOfBirth: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    gender: {
        type: sequelize_1.DataTypes.ENUM('male', 'female', 'other'),
        allowNull: true,
    },
    address: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    emergencyContact: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    medicalHistory: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    allergies: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    insuranceInfo: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    preferences: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    loyaltyPoints: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    membershipTier: {
        type: sequelize_1.DataTypes.ENUM('bronze', 'silver', 'gold', 'platinum'),
        allowNull: false,
        defaultValue: 'bronze',
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
    tableName: "customers",
    timestamps: true,
    indexes: [
        { unique: true, fields: ["userId"], name: "unique_customer_user" },
        { fields: ["membershipTier"], name: "idx_customer_tier" },
        { fields: ["loyaltyPoints"], name: "idx_customer_loyalty" },
    ],
});
exports.default = Customer;
