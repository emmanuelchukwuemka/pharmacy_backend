import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

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
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "lab_tests_catalogue",
        key: "id",
      },
      onDelete: "CASCADE",
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
