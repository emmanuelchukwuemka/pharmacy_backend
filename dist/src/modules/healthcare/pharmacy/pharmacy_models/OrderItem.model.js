"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
class OrderItem extends sequelize_1.Model {
}
exports.OrderItem = OrderItem;
OrderItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "orders",
            key: "id",
        },
    },
    medicineId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "medicines",
            key: "id",
        },
    },
    medicineVariationId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "medicine_variations",
            key: "id",
        },
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    unitPrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    totalPrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    batchNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    expiryDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    prescriptionRequired: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    prescriptionId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "prescriptions",
            key: "id",
        },
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("pending", "confirmed", "shipped", "delivered", "cancelled"),
        defaultValue: "pending",
    },
}, {
    sequelize: sequelize_2.default,
    modelName: "OrderItem",
    tableName: "order_items",
    timestamps: true,
});
exports.default = OrderItem;
