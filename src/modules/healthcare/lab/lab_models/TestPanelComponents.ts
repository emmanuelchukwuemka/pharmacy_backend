import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

export interface TestPanelComponentAttributes {
  id?: number;
  testId: string;
  componentName: string;
  unit?: string;
  referenceRange?: string;
}

export interface TestPanelComponentCreationAttributes
  extends Optional<
    TestPanelComponentAttributes,
    "id" | "referenceRange" | "unit"
  > {}

export class TestPanelComponent
  extends Model<
    TestPanelComponentAttributes,
    TestPanelComponentCreationAttributes
  >
  implements TestPanelComponentAttributes
{
  public id?: number;
  public testId!: string;
  public componentName!: string;
  public unit?: string;
  public referenceRange?: string;
}

TestPanelComponent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    testId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "lab_tests_catalogue",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    componentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    referenceRange: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "test_panel_components",
    timestamps: true,
  }
);
