"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabUserSettings = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
class LabUserSettings extends sequelize_1.Model {
}
exports.LabUserSettings = LabUserSettings;
LabUserSettings.init({
    labId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
            model: "lab_users",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    appointmentReminders: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false },
    autoApproveRequests: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false },
    maxTestsPerDay: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 10,
        allowNull: false,
    },
    notificationSettings: { type: sequelize_1.DataTypes.JSON, allowNull: false },
    emailAlerts: { type: sequelize_1.DataTypes.JSON, allowNull: false },
}, {
    sequelize: sequelize_2.default,
    tableName: "lab_users_settings",
    timestamps: true,
});
