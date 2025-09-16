"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingCarrier = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
class ShippingCarrier extends sequelize_1.Model {
}
exports.ShippingCarrier = ShippingCarrier;
ShippingCarrier.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    contactNumber: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
        validate: {
            isEmail: true,
        },
    },
    website: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
        validate: {
            isUrl: true,
        },
    },
    trackingUrlTemplate: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
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
    tableName: "shipping_carriers",
    timestamps: true,
    indexes: [
        { unique: true, fields: ["name"], name: "unique_carrier_name" },
        { fields: ["active"], name: "carrier_active_index" },
    ],
});
exports.default = ShippingCarrier;
