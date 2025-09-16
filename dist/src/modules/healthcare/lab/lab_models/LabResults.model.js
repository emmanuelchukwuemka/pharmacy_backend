"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabResult = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
class LabResult extends sequelize_1.Model {
}
exports.LabResult = LabResult;
LabResult.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    reportId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "lab_reports",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    testId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "lab_tests_catalogue", key: "id" },
        onDelete: "CASCADE",
    },
    componentId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: "test_panel_components", key: "id" },
        onDelete: "SET NULL",
    },
    value: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, { sequelize: sequelize_2.default, tableName: "lab_results", timestamps: true });
