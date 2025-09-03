/////////////////// LAB TEST CATALOG MODEL ///////////////////////
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

export interface LabTestsCatalogueAttributes {
  id: string;
  labId: string;
  testName: string;
  testImage: string;
  type: string;
  description: string;
  price: number;
  currency: string;
  sampleType: string;
  tat?: string;
  preparationInstructions?: string[] | null;
  availability: boolean;
}

export interface LabTestsCatalogueCreationAttributes
  extends Optional<
    LabTestsCatalogueAttributes,
    "tat" | "preparationInstructions"
  > {}

export class LabTestsCatalogue
  extends Model<
    LabTestsCatalogueAttributes,
    LabTestsCatalogueCreationAttributes
  >
  implements LabTestsCatalogueAttributes
{
  public id!: string;
  public labId!: string;
  public testName!: string;
  public testImage!: string;
  public type!: string;
  public description!: string;
  public price!: number;
  public currency!: string;
  public sampleType!: string;
  public tat?: string;
  public preparationInstructions?: string[] | null;
  public availability!: boolean;
}

LabTestsCatalogue.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    labId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "lab_users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    testName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    testImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("single", "panel"),
      defaultValue: "single",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sampleType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tat: {
      type: DataTypes.STRING,
      defaultValue: "24h",
      allowNull: true,
    },
    preparationInstructions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "lab_tests_catalogue",
    timestamps: true,
  }
);
