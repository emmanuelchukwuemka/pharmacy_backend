import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

/////////////////// LAB NOTIFICATIONS MODEL ///////////////////////
export interface LabNotificationsAttributes {
  labId: string;
  notificationTitle: string;
  detail: string;
  icon: string;
}

export class LabNotifications
  extends Model<LabNotificationsAttributes>
  implements LabNotificationsAttributes
{
  public labId!: string;
  public notificationTitle!: string;
  public detail!: string;
  public icon!: string;
}

LabNotifications.init(
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
    notificationTitle: { type: DataTypes.STRING, allowNull: false },
    detail: { type: DataTypes.STRING, allowNull: false },
    icon: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "lab_notifications",
    timestamps: true,
  }
);
