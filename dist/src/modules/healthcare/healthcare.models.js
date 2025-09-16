"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientData = exports.HealthcareUser = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../config/database/sequelize"));
const healthcare_helpers_1 = require("./healthcare.helpers");
class HealthcareUser extends sequelize_1.Model {
}
exports.HealthcareUser = HealthcareUser;
HealthcareUser.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    bloomzonUserId: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    verificationToken: {
        type: sequelize_1.DataTypes.STRING(255),
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
    tableName: "healthcare_users",
    timestamps: true,
    indexes: [
        { unique: true, fields: ["email"], name: "unique_email_index" },
        { unique: true, fields: ["phone"], name: "unique_phone_index" },
    ],
});
class PatientData extends sequelize_1.Model {
}
exports.PatientData = PatientData;
PatientData.init({
    patientId: {
        type: sequelize_1.DataTypes.STRING(10),
        defaultValue: () => (0, healthcare_helpers_1.generatePatientId)(),
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    sex: {
        type: sequelize_1.DataTypes.ENUM("male", "female", "other"),
        allowNull: false,
    },
    nationality: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    stateOfOrigin: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    bloodGroup: {
        type: sequelize_1.DataTypes.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
        allowNull: true,
    },
    allergies: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    medicalHistory: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    emergencyContact: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "patients",
    timestamps: true,
    indexes: [
        { unique: true, fields: ["email"], name: "unique_patient_email" },
        { unique: true, fields: ["phoneNumber"], name: "unique_patient_phone" },
    ],
});
