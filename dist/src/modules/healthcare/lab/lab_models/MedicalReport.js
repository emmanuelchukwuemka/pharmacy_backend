"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalReport = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
class MedicalReport extends sequelize_1.Model {
}
exports.MedicalReport = MedicalReport;
MedicalReport.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    patientName: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    patientId: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
        references: {
            model: "patients",
            key: "patientId",
        },
        onDelete: "CASCADE",
    },
    testName: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    testId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: "lab_tests_catalogue",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("pending", "completed"),
        allowNull: false,
        defaultValue: "pending",
    },
    reportFile: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    comments: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    reviewedBy: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    createdBy: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "medical_reports",
    timestamps: true,
    indexes: [
        { fields: ["patientId"], name: "index_patient_id" },
        { fields: ["testId"], name: "index_test_id" },
    ],
});
