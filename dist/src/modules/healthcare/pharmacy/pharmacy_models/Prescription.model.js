"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prescription = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
class Prescription extends sequelize_1.Model {
}
exports.Prescription = Prescription;
Prescription.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    prescriptionNumber: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    patientId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    doctorName: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
    },
    doctorLicense: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    doctorContact: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    pharmacyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    medicines: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    issueDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    expiryDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'verified', 'rejected', 'dispensed', 'expired'),
        allowNull: false,
        defaultValue: 'pending',
    },
    controlledSubstances: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    notes: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    digitalSignature: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    verificationCode: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
    },
    verifiedBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    verifiedAt: {
        type: sequelize_1.DataTypes.DATE,
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
    tableName: "prescriptions",
    timestamps: true,
    indexes: [
        { unique: true, fields: ["prescriptionNumber"], name: "unique_prescription_number" },
        { fields: ["patientId"], name: "prescription_patient_index" },
        { fields: ["pharmacyId"], name: "prescription_pharmacy_index" },
        { fields: ["status"], name: "prescription_status_index" },
        { fields: ["expiryDate"], name: "prescription_expiry_index" },
    ],
});
exports.default = Prescription;
