import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

export interface PrescriptionAttributes {
  id: number;
  prescriptionNumber: string;
  patientId: number;
  doctorName: string;
  doctorLicense: string;
  doctorContact: string;
  pharmacyId?: number;
  medicines: PrescriptionMedicine[];
  issueDate: Date;
  expiryDate: Date;
  status: 'pending' | 'verified' | 'rejected' | 'dispensed' | 'expired';
  controlledSubstances: boolean;
  notes?: string;
  digitalSignature?: string;
  verificationCode: string;
  verifiedBy?: number;
  verifiedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PrescriptionMedicine {
  medicineId: number;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  instructions: string;
  refillsAllowed: number;
  refillsRemaining: number;
}

export interface PrescriptionCreationAttributes extends Optional<PrescriptionAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Prescription extends Model<PrescriptionAttributes, PrescriptionCreationAttributes> implements PrescriptionAttributes {
  public id!: number;
  public prescriptionNumber!: string;
  public patientId!: number;
  public doctorName!: string;
  public doctorLicense!: string;
  public doctorContact!: string;
  public pharmacyId?: number;
  public medicines!: PrescriptionMedicine[];
  public issueDate!: Date;
  public expiryDate!: Date;
  public status!: 'pending' | 'verified' | 'rejected' | 'dispensed' | 'expired';
  public controlledSubstances!: boolean;
  public notes?: string;
  public digitalSignature?: string;
  public verificationCode!: string;
  public verifiedBy?: number;
  public verifiedAt?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Prescription.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    prescriptionNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doctorName: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    doctorLicense: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    doctorContact: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    pharmacyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    medicines: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    issueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'verified', 'rejected', 'dispensed', 'expired'),
      allowNull: false,
      defaultValue: 'pending',
    },
    controlledSubstances: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    digitalSignature: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    verificationCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    verifiedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    verifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
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
    tableName: "prescriptions",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["prescriptionNumber"], name: "unique_prescription_number" },
      { fields: ["patientId"], name: "prescription_patient_index" },
      { fields: ["pharmacyId"], name: "prescription_pharmacy_index" },
      { fields: ["status"], name: "prescription_status_index" },
      { fields: ["expiryDate"], name: "prescription_expiry_index" },
    ],
  }
);

export default Prescription;
