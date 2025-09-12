import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

export interface MedicineVariationAttributes {
  id: number;
  medicineId: number;
  dosage: string;
  strength: string;
  unit: string;
  form: 'tablet' | 'capsule' | 'liquid' | 'injection' | 'cream' | 'ointment' | 'powder' | 'other';
  packagingType: 'bottle' | 'strip' | 'box' | 'tube' | 'vial' | 'sachet' | 'other';
  packagingSize: string;
  sku: string;
  price: number;
  costPrice: number;
  stockQuantity: number;
  minStockLevel: number;
  maxStockLevel: number;
  reorderPoint: number;
  expiryDate: Date;
  batchNumber: string;
  manufacturer: string;
  prescriptionRequired: boolean;
  controlledSubstance: boolean;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MedicineVariationCreationAttributes extends Optional<MedicineVariationAttributes, "id" | "createdAt" | "updatedAt"> {}

export class MedicineVariation extends Model<MedicineVariationAttributes, MedicineVariationCreationAttributes> implements MedicineVariationAttributes {
  public id!: number;
  public medicineId!: number;
  public dosage!: string;
  public strength!: string;
  public unit!: string;
  public form!: 'tablet' | 'capsule' | 'liquid' | 'injection' | 'cream' | 'ointment' | 'powder' | 'other';
  public packagingType!: 'bottle' | 'strip' | 'box' | 'tube' | 'vial' | 'sachet' | 'other';
  public packagingSize!: string;
  public sku!: string;
  public price!: number;
  public costPrice!: number;
  public stockQuantity!: number;
  public minStockLevel!: number;
  public maxStockLevel!: number;
  public reorderPoint!: number;
  public expiryDate!: Date;
  public batchNumber!: string;
  public manufacturer!: string;
  public prescriptionRequired!: boolean;
  public controlledSubstance!: boolean;
  public active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MedicineVariation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    medicineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dosage: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    strength: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    form: {
      type: DataTypes.ENUM('tablet', 'capsule', 'liquid', 'injection', 'cream', 'ointment', 'powder', 'other'),
      allowNull: false,
    },
    packagingType: {
      type: DataTypes.ENUM('bottle', 'strip', 'box', 'tube', 'vial', 'sachet', 'other'),
      allowNull: false,
    },
    packagingSize: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    costPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    minStockLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    maxStockLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1000,
    },
    reorderPoint: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 50,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    batchNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    prescriptionRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    controlledSubstance: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "medicine_variations",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["sku"], name: "unique_medicine_sku" },
      { fields: ["medicineId"], name: "medicine_variation_medicine_index" },
      { fields: ["form"], name: "medicine_variation_form_index" },
      { fields: ["expiryDate"], name: "medicine_variation_expiry_index" },
      { fields: ["batchNumber"], name: "medicine_variation_batch_index" },
    ],
  }
);

export default MedicineVariation;
