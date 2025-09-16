"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLog = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
class AuditLog extends sequelize_1.Model {
}
exports.AuditLog = AuditLog;
AuditLog.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "users",
            key: "id",
        },
    },
    pharmacyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "pharmacies",
            key: "id",
        },
    },
    action: {
        type: sequelize_1.DataTypes.ENUM("CREATE", "READ", "UPDATE", "DELETE", "LOGIN", "LOGOUT", "PRESCRIPTION_ACCESS", "CONTROLLED_SUBSTANCE_ACCESS", "PATIENT_DATA_ACCESS", "COMPLIANCE_CHECK", "LICENSE_VERIFICATION", "INVENTORY_ADJUSTMENT", "ORDER_PROCESSING", "PAYMENT_PROCESSING"),
        allowNull: false,
    },
    entityType: {
        type: sequelize_1.DataTypes.ENUM("user", "pharmacy", "medicine", "prescription", "order", "inventory", "compliance_document", "license", "payment", "system"),
        allowNull: false,
    },
    entityId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    oldValues: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    newValues: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    ipAddress: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
    },
    userAgent: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    timestamp: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    sessionId: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    complianceFlag: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    notes: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize: sequelize_2.default,
    modelName: "AuditLog",
    tableName: "audit_logs",
    timestamps: false,
    indexes: [
        { fields: ["userId"], name: "idx_audit_user" },
        { fields: ["pharmacyId"], name: "idx_audit_pharmacy" },
        { fields: ["action"], name: "idx_audit_action" },
        { fields: ["entityType"], name: "idx_audit_entity" },
        { fields: ["timestamp"], name: "idx_audit_timestamp" },
        { fields: ["complianceFlag"], name: "idx_audit_compliance" },
    ],
});
exports.default = AuditLog;
