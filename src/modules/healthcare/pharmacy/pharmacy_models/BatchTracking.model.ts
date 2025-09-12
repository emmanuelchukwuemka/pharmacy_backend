import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

export class BatchTracking extends Model {
  public id!: number;
  public medicineId!: number;
  public pharmacyId!: number;
  public batchNumber!: string;
  public lotNumber!: string;
  public manufacturerBatchId!: string;
  public manufacturingDate!: Date;
  public expiryDate!: Date;
  public receivedDate!: Date;
  public quantityReceived!: number;
  public quantityRemaining!: number;
  public supplierName!: string;
  public supplierBatchId!: string;
  public storageConditions!: object;
  public qualityStatus!: "pending" | "approved" | "rejected" | "quarantined";
  public regulatoryStatus!: "compliant" | "non_compliant" | "under_review";
  public recallStatus!: boolean;
  public recallReason?: string;
  public temperatureLogs!: object;
  public createdAt!: Date;
  public updatedAt!: Date;
}

BatchTracking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    medicineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "medicines",
        key: "id",
      },
    },
    pharmacyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "pharmacies",
        key: "id",
      },
    },
    batchNumber: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lotNumber: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    manufacturerBatchId: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    manufacturingDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    receivedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    quantityReceived: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantityRemaining: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    supplierName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    supplierBatchId: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    storageConditions: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {
        temperature: "room_temperature",
        humidity: "standard",
        light_protection: false,
      },
    },
    qualityStatus: {
      type: DataTypes.ENUM("pending", "approved", "rejected", "quarantined"),
      allowNull: false,
      defaultValue: "pending",
    },
    regulatoryStatus: {
      type: DataTypes.ENUM("compliant", "non_compliant", "under_review"),
      allowNull: false,
      defaultValue: "compliant",
    },
    recallStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    recallReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    temperatureLogs: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    sequelize,
    modelName: "BatchTracking",
    tableName: "batch_tracking",
    timestamps: true,
    indexes: [
      { fields: ["medicineId"], name: "idx_batch_medicine" },
      { fields: ["pharmacyId"], name: "idx_batch_pharmacy" },
      { fields: ["batchNumber"], name: "idx_batch_number" },
      { fields: ["lotNumber"], name: "idx_lot_number" },
      { fields: ["expiryDate"], name: "idx_batch_expiry" },
      { fields: ["qualityStatus"], name: "idx_batch_quality" },
      { fields: ["regulatoryStatus"], name: "idx_batch_regulatory" },
      { fields: ["recallStatus"], name: "idx_batch_recall" },
    ],
  }
);

export default BatchTracking;
