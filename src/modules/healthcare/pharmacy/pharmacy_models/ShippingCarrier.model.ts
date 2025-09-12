import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

export interface ShippingCarrierAttributes {
  id: number;
  name: string;
  contactNumber?: string;
  email?: string;
  website?: string;
  trackingUrlTemplate?: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ShippingCarrierCreationAttributes extends Optional<ShippingCarrierAttributes, "id" | "createdAt" | "updatedAt"> {}

export class ShippingCarrier extends Model<ShippingCarrierAttributes, ShippingCarrierCreationAttributes> implements ShippingCarrierAttributes {
  public id!: number;
  public name!: string;
  public contactNumber?: string;
  public email?: string;
  public website?: string;
  public trackingUrlTemplate?: string;
  public active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ShippingCarrier.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    contactNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    website: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    trackingUrlTemplate: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "shipping_carriers",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["name"], name: "unique_carrier_name" },
      { fields: ["active"], name: "carrier_active_index" },
    ],
  }
);

export default ShippingCarrier;
