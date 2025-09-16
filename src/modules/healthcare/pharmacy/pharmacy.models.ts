import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database/sequelize";

// Pharmacy model
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
  createdAt: Date;
  updatedAt: Date;
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

// Medicine model
export interface MedicineAttributes {
  id: number;
  name: string;
  genericName?: string;
  brandName?: string;
  description: string;
  category: string;
  dosage: string;
  form: 'tablet' | 'capsule' | 'liquid' | 'injection' | 'cream' | 'ointment' | 'powder' | 'other';
  strength: string;
  unit: string;
  prescriptionRequired: boolean;
  price: number;
  stockQuantity: number;
  expiryDate: Date;
  batchNumber: string;
  manufacturer: string;
  sideEffects?: string[];
  interactions?: string[];
  pharmacyId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicineCreationAttributes extends Optional<MedicineAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Medicine extends Model<MedicineAttributes, MedicineCreationAttributes> implements MedicineAttributes {
  public id!: number;
  public name!: string;
  public genericName?: string;
  public brandName?: string;
  public description!: string;
  public category!: string;
  public dosage!: string;
  public form!: 'tablet' | 'capsule' | 'liquid' | 'injection' | 'cream' | 'ointment' | 'powder' | 'other';
  public strength!: string;
  public unit!: string;
  public prescriptionRequired!: boolean;
  public price!: number;
  public stockQuantity!: number;
  public expiryDate!: Date;
  public batchNumber!: string;
  public manufacturer!: string;
  public sideEffects?: string[];
  public interactions?: string[];
  public pharmacyId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Medicine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    genericName: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    brandName: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dosage: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    form: {
      type: DataTypes.ENUM('tablet', 'capsule', 'liquid', 'injection', 'cream', 'ointment', 'powder', 'other'),
      allowNull: false,
    },
    strength: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    prescriptionRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    batchNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    sideEffects: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    interactions: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    pharmacyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pharmacy,
        key: 'id',
      },
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
    tableName: "medicines",
    timestamps: true,
    indexes: [
      { fields: ["pharmacyId"], name: "pharmacy_medicines_index" },
      { fields: ["category"], name: "medicine_category_index" },
      { fields: ["name"], name: "medicine_name_index" },
      { fields: ["expiryDate"], name: "medicine_expiry_index" },
    ],
  }
);

// Inventory model
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
      references: {
        model: Medicine,
        key: 'id',
      },
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
      references: {
        model: Pharmacy,
        key: 'id',
      },
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
    tableName: "inventory",
    timestamps: true,
    indexes: [
      { fields: ["pharmacyId"], name: "pharmacy_inventory_index" },
      { fields: ["medicineId"], name: "medicine_inventory_index" },
      { fields: ["expiryDate"], name: "inventory_expiry_index" },
    ],
  }
);

// Define associations
Pharmacy.hasMany(Medicine, { foreignKey: 'pharmacyId', as: 'medicines' });
Medicine.belongsTo(Pharmacy, { foreignKey: 'pharmacyId', as: 'pharmacy' });

Medicine.hasMany(Inventory, { foreignKey: 'medicineId', as: 'inventory' });
Inventory.belongsTo(Medicine, { foreignKey: 'medicineId', as: 'medicine' });

Pharmacy.hasMany(Inventory, { foreignKey: 'pharmacyId', as: 'inventory' });
Inventory.belongsTo(Pharmacy, { foreignKey: 'pharmacyId', as: 'pharmacy' });
