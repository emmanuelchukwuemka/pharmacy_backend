import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

export interface LabResultsAttributes {
  id?: number;
  reportId: string;
  testId: string;
  componentId?: number;
  value: string;
}

export interface LabResultsCreationAttributes
  extends Optional<LabResultsAttributes, "id" | "componentId"> {}

export class LabResult
  extends Model<LabResultsAttributes, LabResultsCreationAttributes>
  implements LabResultsAttributes
{
  public id?: number;
  public reportId!: string;
  public testId!: string;
  public componentId?: number;
  public value!: string;
}

LabResult.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    reportId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "lab_reports",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    testId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "lab_tests_catalogue", key: "id" },
      onDelete: "CASCADE",
    },
    componentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "test_panel_components", key: "id" },
      onDelete: "SET NULL",
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, tableName: "lab_results", timestamps: true }
);
