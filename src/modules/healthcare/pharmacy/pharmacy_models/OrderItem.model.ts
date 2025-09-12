import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

export class OrderItem extends Model {
  public id!: number;
  public orderId!: number;
  public medicineId!: number;
  public medicineVariationId!: number;
  public quantity!: number;
  public unitPrice!: number;
  public totalPrice!: number;
  public batchNumber!: string;
  public expiryDate!: Date;
  public prescriptionRequired!: boolean;
  public prescriptionId?: number;
  public status!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
    },
    medicineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "medicines",
        key: "id",
      },
    },
    medicineVariationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "medicine_variations",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    batchNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    prescriptionRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    prescriptionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "prescriptions",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "shipped", "delivered", "cancelled"),
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "OrderItem",
    tableName: "order_items",
    timestamps: true,
  }
);

export default OrderItem;
