import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

export class AuditLog extends Model {
  public id!: number;
  public userId?: number;
  public pharmacyId?: number;
  public action!: string;
  public entityType!: string;
  public entityId?: number;
  public oldValues?: object;
  public newValues?: object;
  public ipAddress?: string;
  public userAgent?: string;
  public timestamp!: Date;
  public sessionId?: string;
  public complianceFlag!: boolean;
  public notes?: string;
}

AuditLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    pharmacyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "pharmacies",
        key: "id",
      },
    },
    action: {
      type: DataTypes.ENUM(
        "CREATE",
        "READ",
        "UPDATE",
        "DELETE",
        "LOGIN",
        "LOGOUT",
        "PRESCRIPTION_ACCESS",
        "CONTROLLED_SUBSTANCE_ACCESS",
        "PATIENT_DATA_ACCESS",
        "COMPLIANCE_CHECK",
        "LICENSE_VERIFICATION",
        "INVENTORY_ADJUSTMENT",
        "ORDER_PROCESSING",
        "PAYMENT_PROCESSING"
      ),
      allowNull: false,
    },
    entityType: {
      type: DataTypes.ENUM(
        "user",
        "pharmacy",
        "medicine",
        "prescription",
        "order",
        "inventory",
        "compliance_document",
        "license",
        "payment",
        "system"
      ),
      allowNull: false,
    },
    entityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    oldValues: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    newValues: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    ipAddress: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    sessionId: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    complianceFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "AuditLog",
    tableName: "audit_logs",
    timestamps: false,
    indexes: [
      { fields: ["userId"], name: "idx_audit_user" },
      { fields: ["pharmacyId"], name: "idx_audit_pharmacy" },
      { fields: ["action"], name: "idx_audit_action" },
      { fields: ["entityType"], name: "idx_audit_entity" },
      { fields: ["timestamp"], name: "idx_audit_timestamp" },
      { fields: ["complianceFlag"], name: "idx_audit_compliance" },
    ],
  }
);

export default AuditLog;
