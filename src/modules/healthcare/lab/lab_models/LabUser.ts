import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

/////////////////// LAB USER MODEL ///////////////////////
export interface LabUserAttributes {
  id: string;
  healthcareUserId: string;
  fullName: string;
  labName: string;
  email: string;
  phone: string;
  profilePicUrl: string;
  coverPhotoUrl: string;
  labAddress: string;
  licenseNumber: string;
  workHours: string;
  modeOfService: string;
  breakTime: string;
}

export interface LabUserCreationAttributes
  extends Optional<LabUserAttributes, "id"> {}

export class LabUser
  extends Model<LabUserAttributes, LabUserCreationAttributes>
  implements LabUserAttributes
{
  public id!: string;
  public healthcareUserId!: string;
  public fullName!: string;
  public labName!: string;
  public email!: string;
  public phone!: string;
  public profilePicUrl!: string;
  public coverPhotoUrl!: string;
  public labAddress!: string;
  public licenseNumber!: string;
  public workHours!: string;
  public modeOfService!: string;
  public breakTime!: string;
}

LabUser.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    healthcareUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "healthcare_users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    fullName: { type: DataTypes.STRING(100), allowNull: false },
    labName: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    phone: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    profilePicUrl: { type: DataTypes.STRING(255), allowNull: false },
    coverPhotoUrl: { type: DataTypes.STRING(255), allowNull: false },
    labAddress: { type: DataTypes.STRING(255), allowNull: false },
    licenseNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    workHours: { type: DataTypes.JSON, allowNull: false },
    modeOfService: { type: DataTypes.STRING(20), allowNull: false },
    breakTime: { type: DataTypes.JSON, allowNull: false },
  },
  {
    sequelize,
    tableName: "lab_users",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["healthcareUserId"],
        name: "unique_healthcareUserId_index",
      },
      { unique: true, fields: ["email"], name: "unique_email_index" },
      { unique: true, fields: ["phone"], name: "unique_phone_index" },
      {
        unique: true,
        fields: ["licenseNumber"],
        name: "unique_licenseNumber_index",
      },
    ],
  }
);
