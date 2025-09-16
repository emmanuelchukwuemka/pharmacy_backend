"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabReport = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
class LabReport extends sequelize_1.Model {
}
exports.LabReport = LabReport;
LabReport.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    labId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "lab_users",
            key: "id",
        },
        onDelete: "CASCADE",
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
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    testId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "lab_tests_catalogue",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    reportUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("pending", "completed", "in-progress"),
        defaultValue: "pending",
    },
    issuedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    remarks: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "lab_reports",
    timestamps: true,
});
