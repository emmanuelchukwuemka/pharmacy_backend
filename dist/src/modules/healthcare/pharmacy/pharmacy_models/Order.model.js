"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
class Order extends sequelize_1.Model {
}
exports.Order = Order;
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    orderNumber: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    customerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    pharmacyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    prescriptionId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    items: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    subtotal: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    tax: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
    },
    discount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
    },
    totalAmount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    currency: {
        type: sequelize_1.DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'USD',
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'),
        allowNull: false,
        defaultValue: 'pending',
    },
    paymentStatus: {
        type: sequelize_1.DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
        allowNull: false,
        defaultValue: 'pending',
    },
    paymentMethod: {
        type: sequelize_1.DataTypes.ENUM('cash', 'card', 'insurance', 'online'),
        allowNull: false,
    },
    shippingAddress: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    billingAddress: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    deliveryMethod: {
        type: sequelize_1.DataTypes.ENUM('pickup', 'delivery', 'express', 'international'),
        allowNull: false,
    },
    shippingCarrier: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    trackingNumber: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    estimatedDelivery: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    actualDelivery: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    specialInstructions: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    requiresPrescription: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    controlledSubstances: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    insuranceClaimId: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
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
    tableName: "orders",
    timestamps: true,
    indexes: [
        { unique: true, fields: ["orderNumber"], name: "unique_order_number" },
        { fields: ["customerId"], name: "order_customer_index" },
        { fields: ["pharmacyId"], name: "order_pharmacy_index" },
        { fields: ["status"], name: "order_status_index" },
        { fields: ["paymentStatus"], name: "order_payment_status_index" },
        { fields: ["createdAt"], name: "order_date_index" },
    ],
});
exports.default = Order;
