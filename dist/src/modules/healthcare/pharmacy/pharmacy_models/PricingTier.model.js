"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingTier = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
class PricingTier extends sequelize_1.Model {
}
exports.PricingTier = PricingTier;
PricingTier.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    medicineId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "medicines",
            key: "id",
        },
    },
    pharmacyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "pharmacies",
            key: "id",
        },
    },
    minQuantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    maxQuantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    discountPercentage: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: true,
        defaultValue: 0,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    region: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "global",
    },
    currency: {
        type: sequelize_1.DataTypes.STRING(3),
        allowNull: false,
        defaultValue: "USD",
    },
    effectiveFrom: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    effectiveTo: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: sequelize_2.default,
    modelName: "PricingTier",
    tableName: "pricing_tiers",
    timestamps: true,
    indexes: [
        { fields: ["medicineId", "pharmacyId"], name: "idx_pricing_medicine_pharmacy" },
        { fields: ["region"], name: "idx_pricing_region" },
        { fields: ["isActive"], name: "idx_pricing_active" },
    ],
});
exports.default = PricingTier;
