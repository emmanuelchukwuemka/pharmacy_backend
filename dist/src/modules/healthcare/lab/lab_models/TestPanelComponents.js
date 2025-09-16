"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestPanelComponent = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../../config/database/sequelize"));
class TestPanelComponent extends sequelize_1.Model {
}
exports.TestPanelComponent = TestPanelComponent;
TestPanelComponent.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
    componentName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    unit: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    referenceRange: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "test_panel_components",
    timestamps: true,
});
