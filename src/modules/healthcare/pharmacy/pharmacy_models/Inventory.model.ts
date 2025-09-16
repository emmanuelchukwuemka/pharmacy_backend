import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

export interface InventoryAttributes {
  id: number;
  medicineId: number;
  quantity: number;
  batchNumber: string;
  expiryDate: Date;
  purchasePrice: number;
  sellingPrice: number;
  supplier: string;
  location: string;
  pharmacyId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryCreationAttributes extends Optional<InventoryAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Inventory extends Model<InventoryAttributes, InventoryCreationAttributes> implements InventoryAttributes {
  public id!: number;
  public medicineId!: number;
  public quantity!: number;
  public batchNumber!: string;
  public expiryDate!: Date;
  public purchasePrice!: number;
  public sellingPrice!: number;
  public supplier!: string;
  public location!: string;
  public pharmacyId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Inventory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    medicineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    batchNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    purchasePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    sellingPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    supplier: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    pharmacyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "inventory",
    timestamps: true,
    indexes: [
      { fields: ["pharmacyId"], name: "pharmacy_inventory_index" },
      { fields: ["medicineId"], name: "medicine_inventory_index" },
      { fields: ["expiryDate"], name: "inventory_expiry_index" },
    ],
  }
);

export default Inventory;
