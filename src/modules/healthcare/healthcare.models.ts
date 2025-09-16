import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database/sequelize";
import { generatePatientId } from "./healthcare.helpers";

export interface HealthcareUserAttributes {
  id: string;
  bloomzonUserId: string;
  email: string;
  phone: string;
  password: string;
  fullName: string;
  isVerified: boolean;
  isActive: boolean;
  verificationToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface HealthcareUserCreationAttributes
  extends Optional<HealthcareUserAttributes, "id" | "isVerified" | "isActive" | "verificationToken" | "createdAt" | "updatedAt"> {}

export class HealthcareUser
  extends Model<HealthcareUserAttributes, HealthcareUserCreationAttributes>
  implements HealthcareUserAttributes
{
  public id!: string;
  public bloomzonUserId!: string;
  public email!: string;
  public phone!: string;
  public password!: string;
  public fullName!: string;
  public isVerified!: boolean;
  public isActive!: boolean;
  public verificationToken?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

HealthcareUser.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    bloomzonUserId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    verificationToken: {
      type: DataTypes.STRING(255),
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
    tableName: "healthcare_users",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["email"], name: "unique_email_index" },
      { unique: true, fields: ["phone"], name: "unique_phone_index" },
    ],
  }
);

/////////////////// PATIENT DATA MODEL ///////////////////////
export interface PatientDataAttributes {
  patientId: string;
  name: string;
  age: number;
  sex: "male" | "female" | "other";
  nationality: string;
  stateOfOrigin: string;
  phoneNumber?: string;
  email?: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  allergies?: string[] | null;
  medicalHistory?: string | null;
  emergencyContact?: string;
}

export interface PatientDataCreationAttributes
  extends Optional<PatientDataAttributes, "patientId"> {}

export class PatientData
  extends Model<PatientDataAttributes, PatientDataCreationAttributes>
  implements PatientDataAttributes
{
  public patientId!: string;
  public name!: string;
  public age!: number;
  public sex!: "male" | "female" | "other";
  public nationality!: string;
  public stateOfOrigin!: string;
  public phoneNumber?: string;
  public email?: string;
  public bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  public allergies?: string[] | null;
  public medicalHistory?: string | null;
  public emergencyContact?: string;
}

PatientData.init(
  {
    patientId: {
      type: DataTypes.STRING(10),
      defaultValue: () => generatePatientId(),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sex: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    stateOfOrigin: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    bloodGroup: {
      type: DataTypes.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
      allowNull: true,
    },
    allergies: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    medicalHistory: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    emergencyContact: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "patients",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["email"], name: "unique_patient_email" },
      { unique: true, fields: ["phoneNumber"], name: "unique_patient_phone" },
    ],
  }
);
