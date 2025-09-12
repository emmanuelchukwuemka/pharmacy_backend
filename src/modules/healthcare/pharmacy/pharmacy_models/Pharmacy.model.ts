import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

export interface PharmacyAttributes {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  licenseNumber: string;
  ownerName: string;
  businessType: 'independent' | 'chain' | 'hospital' | 'clinic';
  operatingHours: object;
  services: string[];
  status: 'pending' | 'verified' | 'rejected' | 'suspended';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PharmacyCreationAttributes extends Optional<PharmacyAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Pharmacy extends Model<PharmacyAttributes, PharmacyCreationAttributes> implements PharmacyAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public address!: string;
  public licenseNumber!: string;
  public ownerName!: string;
  public businessType!: 'independent' | 'chain' | 'hospital' | 'clinic';
  public operatingHours!: object;
  public services!: string[];
  public status!: 'pending' | 'verified' | 'rejected' | 'suspended';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Pharmacy.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    licenseNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    ownerName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    businessType: {
      type: DataTypes.ENUM('independent', 'chain', 'hospital', 'clinic'),
      allowNull: false,
    },
    operatingHours: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    services: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'verified', 'rejected', 'suspended'),
      allowNull: false,
      defaultValue: 'pending',
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
    tableName: "pharmacies",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["email"], name: "unique_pharmacy_email" },
      { unique: true, fields: ["licenseNumber"], name: "unique_license_number" },
    ],
  }
);

export default Pharmacy;
