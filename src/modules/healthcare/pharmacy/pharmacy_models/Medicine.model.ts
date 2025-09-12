import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

export interface MedicineAttributes {
  id: number;
  name: string;
  genericName?: string;
  brandName?: string;
  description: string;
  category: string;
  dosage: string;
  form: 'tablet' | 'capsule' | 'liquid' | 'injection' | 'cream' | 'ointment' | 'powder' | 'other';
  strength: string;
  unit: string;
  prescriptionRequired: boolean;
  price: number;
  stockQuantity: number;
  expiryDate: Date;
  batchNumber: string;
  manufacturer: string;
  sideEffects?: string[];
  interactions?: string[];
  pharmacyId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicineCreationAttributes extends Optional<MedicineAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Medicine extends Model<MedicineAttributes, MedicineCreationAttributes> implements MedicineAttributes {
  public id!: number;
  public name!: string;
  public genericName?: string;
  public brandName?: string;
  public description!: string;
  public category!: string;
  public dosage!: string;
  public form!: 'tablet' | 'capsule' | 'liquid' | 'injection' | 'cream' | 'ointment' | 'powder' | 'other';
  public strength!: string;
  public unit!: string;
  public prescriptionRequired!: boolean;
  public price!: number;
  public stockQuantity!: number;
  public expiryDate!: Date;
  public batchNumber!: string;
  public manufacturer!: string;
  public sideEffects?: string[];
  public interactions?: string[];
  public pharmacyId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Medicine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    genericName: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    brandName: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dosage: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    form: {
      type: DataTypes.ENUM('tablet', 'capsule', 'liquid', 'injection', 'cream', 'ointment', 'powder', 'other'),
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
    prescriptionRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    sideEffects: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    interactions: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    pharmacyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "medicines",
    timestamps: true,
    indexes: [
      { fields: ["pharmacyId"], name: "pharmacy_medicines_index" },
      { fields: ["category"], name: "medicine_category_index" },
      { fields: ["name"], name: "medicine_name_index" },
      { fields: ["expiryDate"], name: "medicine_expiry_index" },
    ],
  }
);

export default Medicine;
