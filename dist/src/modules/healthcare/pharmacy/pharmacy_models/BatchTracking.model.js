"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchTracking = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
class BatchTracking extends sequelize_1.Model {
}
exports.BatchTracking = BatchTracking;
BatchTracking.init({
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
    batchNumber: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    lotNumber: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    manufacturerBatchId: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    manufacturingDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    expiryDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    receivedDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    quantityReceived: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    quantityRemaining: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    supplierName: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    supplierBatchId: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    storageConditions: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
        defaultValue: {
            temperature: "room_temperature",
            humidity: "standard",
            light_protection: false,
        },
    },
    qualityStatus: {
        type: sequelize_1.DataTypes.ENUM("pending", "approved", "rejected", "quarantined"),
        allowNull: false,
        defaultValue: "pending",
    },
    regulatoryStatus: {
        type: sequelize_1.DataTypes.ENUM("compliant", "non_compliant", "under_review"),
        allowNull: false,
        defaultValue: "compliant",
    },
    recallStatus: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    recallReason: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    temperatureLogs: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
    },
}, {
    sequelize: sequelize_2.default,
    modelName: "BatchTracking",
    tableName: "batch_tracking",
    timestamps: true,
    indexes: [
        { fields: ["medicineId"], name: "idx_batch_medicine" },
        { fields: ["pharmacyId"], name: "idx_batch_pharmacy" },
        { fields: ["batchNumber"], name: "idx_batch_number" },
        { fields: ["lotNumber"], name: "idx_lot_number" },
        { fields: ["expiryDate"], name: "idx_batch_expiry" },
        { fields: ["qualityStatus"], name: "idx_batch_quality" },
        { fields: ["regulatoryStatus"], name: "idx_batch_regulatory" },
        { fields: ["recallStatus"], name: "idx_batch_recall" },
    ],
});
exports.default = BatchTracking;
