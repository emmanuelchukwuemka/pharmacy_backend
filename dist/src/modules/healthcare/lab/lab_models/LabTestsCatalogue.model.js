"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabTestsCatalogue = void 0;
/////////////////// LAB TEST CATALOG MODEL ///////////////////////
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
class LabTestsCatalogue extends sequelize_1.Model {
}
exports.LabTestsCatalogue = LabTestsCatalogue;
LabTestsCatalogue.init({
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
    testName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    testImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM("single", "panel"),
        defaultValue: "single",
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    currency: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    sampleType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tat: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "24h",
        allowNull: true,
    },
    preparationInstructions: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    availability: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "lab_tests_catalogue",
    timestamps: true,
});
