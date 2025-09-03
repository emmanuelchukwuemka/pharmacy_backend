import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

/////////////////// SETTINGS MODEL ///////////////////////
export interface LabUserSettingsAttributes {
  labId: string;
  appointmentReminders: boolean;
  autoApproveRequests: boolean;
  maxTestsPerDay: number;
  notificationSettings: string;
  emailAlerts: string;
}

export interface LabUserSettingsCreationAttributes
  extends Optional<LabUserSettingsAttributes, "maxTestsPerDay"> {}

export class LabUserSettings
  extends Model<LabUserSettingsAttributes, LabUserSettingsCreationAttributes>
  implements LabUserSettingsAttributes
{
  public labId!: string;
  public appointmentReminders!: boolean;
  public autoApproveRequests!: boolean;
  public maxTestsPerDay!: number;
  public notificationSettings!: string;
  public emailAlerts!: string;
}

LabUserSettings.init(
  {
    labId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "lab_users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    appointmentReminders: { type: DataTypes.BOOLEAN, allowNull: false },
    autoApproveRequests: { type: DataTypes.BOOLEAN, allowNull: false },
    maxTestsPerDay: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
      allowNull: false,
    },
    notificationSettings: { type: DataTypes.JSON, allowNull: false },
    emailAlerts: { type: DataTypes.JSON, allowNull: false },
  },
  {
    sequelize,
    tableName: "lab_users_settings",
    timestamps: true,
  }
);
