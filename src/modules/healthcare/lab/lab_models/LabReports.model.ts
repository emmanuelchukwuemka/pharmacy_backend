import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

export interface LabReportAttributes {
  id: string;
  labId: string;
  patientId: string;
  testName: string;
  testId: string;
  reportUrl: string;
  status: "pending" | "completed" | "in-progress";
  issuedAt?: Date;
  remarks?: string | null;
}

export interface LabReportCreationAttributes
  extends Optional<LabReportAttributes, "id" | "issuedAt" | "remarks"> {}

export class LabReport
  extends Model<LabReportAttributes, LabReportCreationAttributes>
  implements LabReportAttributes
{
  public id!: string;
  public labId!: string;
  public patientId!: string;
  public testName!: string;
  public testId!: string;
  public reportUrl!: string;
  public status!: "pending" | "completed" | "in-progress";
  public issuedAt?: Date;
  public remarks?: string | null;
}

LabReport.init(
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
    patientId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "patients",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    testName: {
      type: DataTypes.STRING,
      allowNull: false,
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
    reportUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "in-progress"),
      defaultValue: "pending",
    },
    issuedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "lab_reports",
    timestamps: true,
  }
);
