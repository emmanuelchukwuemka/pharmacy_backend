"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicineInteraction = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
class MedicineInteraction extends sequelize_1.Model {
}
exports.MedicineInteraction = MedicineInteraction;
MedicineInteraction.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    medicineId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    interactingMedicineId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    interactionType: {
        type: sequelize_1.DataTypes.ENUM('major', 'moderate', 'minor', 'unknown'),
        allowNull: false,
    },
    severity: {
        type: sequelize_1.DataTypes.ENUM('high', 'medium', 'low'),
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    clinicalEffects: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    management: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    evidenceLevel: {
        type: sequelize_1.DataTypes.ENUM('excellent', 'good', 'fair', 'poor'),
        allowNull: false,
    },
    reference: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
    tableName: "medicine_interactions",
    timestamps: true,
    indexes: [
        { fields: ["medicineId"], name: "interaction_medicine_index" },
        { fields: ["interactingMedicineId"], name: "interaction_interacting_medicine_index" },
        { fields: ["interactionType"], name: "interaction_type_index" },
        { fields: ["severity"], name: "interaction_severity_index" },
        { unique: true, fields: ["medicineId", "interactingMedicineId"], name: "unique_medicine_interaction" },
    ],
});
exports.default = MedicineInteraction;
