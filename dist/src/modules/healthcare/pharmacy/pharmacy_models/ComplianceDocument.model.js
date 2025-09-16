"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplianceDocument = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
class ComplianceDocument extends sequelize_1.Model {
}
exports.ComplianceDocument = ComplianceDocument;
ComplianceDocument.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    pharmacyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "pharmacies",
            key: "id",
        },
    },
    documentType: {
        type: sequelize_1.DataTypes.ENUM("pharmacy_license", "controlled_substance_license", "dea_registration", "state_license", "nabp_verification", "insurance_credentialing", "background_check", "business_license", "tax_certificate", "professional_liability_insurance"),
        allowNull: false,
    },
    documentName: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    documentUrl: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    expiryDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("pending", "approved", "rejected", "expired"),
        allowNull: false,
        defaultValue: "pending",
    },
    verifiedBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "users",
            key: "id",
        },
    },
    verifiedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    rejectionReason: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    region: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "US",
    },
    regulatoryBody: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    modelName: "ComplianceDocument",
    tableName: "compliance_documents",
    timestamps: true,
    indexes: [
        { fields: ["pharmacyId"], name: "idx_compliance_pharmacy" },
        { fields: ["status"], name: "idx_compliance_status" },
        { fields: ["documentType"], name: "idx_compliance_type" },
        { fields: ["expiryDate"], name: "idx_compliance_expiry" },
    ],
});
exports.default = ComplianceDocument;
