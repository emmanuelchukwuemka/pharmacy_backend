"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabNotifications = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
class LabNotifications extends sequelize_1.Model {
}
exports.LabNotifications = LabNotifications;
LabNotifications.init({
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
    notificationTitle: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    detail: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    icon: { type: sequelize_1.DataTypes.STRING, allowNull: false },
}, {
    sequelize: sequelize_2.default,
    tableName: "lab_notifications",
    timestamps: true,
});
