"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabUser = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
class LabUser extends sequelize_1.Model {
}
exports.LabUser = LabUser;
LabUser.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    healthcareUserId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "healthcare_users",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    fullName: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    labName: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING(255), allowNull: false, unique: true },
    phone: { type: sequelize_1.DataTypes.STRING(20), allowNull: false, unique: true },
    profilePicUrl: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    coverPhotoUrl: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    labAddress: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    licenseNumber: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    workHours: { type: sequelize_1.DataTypes.JSON, allowNull: false },
    modeOfService: { type: sequelize_1.DataTypes.STRING(20), allowNull: false },
    breakTime: { type: sequelize_1.DataTypes.JSON, allowNull: false },
}, {
    sequelize: sequelize_2.default,
    tableName: "lab_users",
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["healthcareUserId"],
            name: "unique_healthcareUserId_index",
        },
        { unique: true, fields: ["email"], name: "unique_email_index" },
        { unique: true, fields: ["phone"], name: "unique_phone_index" },
        {
            unique: true,
            fields: ["licenseNumber"],
            name: "unique_licenseNumber_index",
        },
    ],
});
