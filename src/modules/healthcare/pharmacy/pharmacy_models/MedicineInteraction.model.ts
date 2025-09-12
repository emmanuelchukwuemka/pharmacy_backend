import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

export interface MedicineInteractionAttributes {
  id: number;
  medicineId: number;
  interactingMedicineId: number;
  interactionType: 'major' | 'moderate' | 'minor' | 'unknown';
  severity: 'high' | 'medium' | 'low';
  description: string;
  clinicalEffects?: string;
  management?: string;
  evidenceLevel: 'excellent' | 'good' | 'fair' | 'poor';
  reference?: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MedicineInteractionCreationAttributes extends Optional<MedicineInteractionAttributes, "id" | "createdAt" | "updatedAt"> {}

export class MedicineInteraction extends Model<MedicineInteractionAttributes, MedicineInteractionCreationAttributes> implements MedicineInteractionAttributes {
  public id!: number;
  public medicineId!: number;
  public interactingMedicineId!: number;
  public interactionType!: 'major' | 'moderate' | 'minor' | 'unknown';
  public severity!: 'high' | 'medium' | 'low';
  public description!: string;
  public clinicalEffects?: string;
  public management?: string;
  public evidenceLevel!: 'excellent' | 'good' | 'fair' | 'poor';
  public reference?: string;
  public active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MedicineInteraction.init(
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
    interactingMedicineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    interactionType: {
      type: DataTypes.ENUM('major', 'moderate', 'minor', 'unknown'),
      allowNull: false,
    },
    severity: {
      type: DataTypes.ENUM('high', 'medium', 'low'),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    clinicalEffects: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    management: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    evidenceLevel: {
      type: DataTypes.ENUM('excellent', 'good', 'fair', 'poor'),
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING(500),
      allowNull: true,
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
    tableName: "medicine_interactions",
    timestamps: true,
    indexes: [
      { fields: ["medicineId"], name: "interaction_medicine_index" },
      { fields: ["interactingMedicineId"], name: "interaction_interacting_medicine_index" },
      { fields: ["interactionType"], name: "interaction_type_index" },
      { fields: ["severity"], name: "interaction_severity_index" },
      { unique: true, fields: ["medicineId", "interactingMedicineId"], name: "unique_medicine_interaction" },
    ],
  }
);

export default MedicineInteraction;
