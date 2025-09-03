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
}

export interface HealthcareUserCreationAttributes
  extends Optional<HealthcareUserAttributes, "id"> {}

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
      type: DataTypes.ARRAY(DataTypes.STRING),
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

export interface MedicalReportAttributes {
  id: string;
  patientName: string;
  patientId: string;
  testName: string;
  testId?: string;
  status: "pending" | "completed";
  reportFile?: string;
  comments?: string;
  reviewedBy?: string;
  createdBy: string;
}

export interface MedicalReportCreationAttributes
  extends Optional<
    MedicalReportAttributes,
    "id" | "testId" | "reportFile" | "comments" | "reviewedBy"
  > {}

export class MedicalReport
  extends Model<MedicalReportAttributes, MedicalReportCreationAttributes>
  implements MedicalReportAttributes
{
  public id!: string;
  public patientName!: string;
  public patientId!: string;
  public testName!: string;
  public testId?: string;
  public status!: "pending" | "completed";
  public reportFile?: string;
  public comments?: string;
  public reviewedBy?: string;
  public createdBy!: string;
}

MedicalReport.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    patientName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    patientId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: "patients",
        key: "patientId",
      },
      onDelete: "CASCADE",
    },
    testName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    testId: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed"),
      allowNull: false,
      defaultValue: "pending",
    },
    reportFile: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reviewedBy: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "medical_reports",
    timestamps: true,
    indexes: [
      { fields: ["patientId"], name: "index_patient_id" },
      { fields: ["testId"], name: "index_test_id" },
    ],
  }
);
