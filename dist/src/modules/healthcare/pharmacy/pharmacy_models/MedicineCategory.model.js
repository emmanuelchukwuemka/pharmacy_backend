"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicineCategory = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
class MedicineCategory extends sequelize_1.Model {
}
exports.MedicineCategory = MedicineCategory;
MedicineCategory.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    parentId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    therapeuticClass: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    atcCode: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true,
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    sortOrder: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    tableName: "medicine_categories",
    timestamps: true,
    indexes: [
        { unique: true, fields: ["name"], name: "unique_category_name" },
        { fields: ["parentId"], name: "category_parent_index" },
        { fields: ["therapeuticClass"], name: "category_therapeutic_index" },
        { fields: ["active"], name: "category_active_index" },
    ],
});
// Self-referencing relationship for hierarchical categories
MedicineCategory.belongsTo(MedicineCategory, { foreignKey: 'parentId', as: 'parent' });
MedicineCategory.hasMany(MedicineCategory, { foreignKey: 'parentId', as: 'subcategories' });
exports.default = MedicineCategory;
