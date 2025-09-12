import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

export interface CustomerAttributes {
  id: number;
  userId: number;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  address?: object;
  emergencyContact?: object;
  medicalHistory?: object;
  allergies?: string[];
  insuranceInfo?: object;
  preferences?: object;
  loyaltyPoints: number;
  membershipTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CustomerCreationAttributes extends Optional<CustomerAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Customer extends Model<CustomerAttributes, CustomerCreationAttributes> implements CustomerAttributes {
  public id!: number;
  public userId!: number;
  public dateOfBirth?: Date;
  public gender?: 'male' | 'female' | 'other';
  public address?: object;
  public emergencyContact?: object;
  public medicalHistory?: object;
  public allergies?: string[];
  public insuranceInfo?: object;
  public preferences?: object;
  public loyaltyPoints!: number;
  public membershipTier!: 'bronze' | 'silver' | 'gold' | 'platinum';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: true,
    },
    address: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    emergencyContact: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    medicalHistory: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    allergies: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    insuranceInfo: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    preferences: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    loyaltyPoints: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    membershipTier: {
      type: DataTypes.ENUM('bronze', 'silver', 'gold', 'platinum'),
      allowNull: false,
      defaultValue: 'bronze',
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
    tableName: "customers",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["userId"], name: "unique_customer_user" },
      { fields: ["membershipTier"], name: "idx_customer_tier" },
      { fields: ["loyaltyPoints"], name: "idx_customer_loyalty" },
    ],
  }
);

export default Customer;
