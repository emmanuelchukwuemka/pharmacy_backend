import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

export interface MedicineCategoryAttributes {
  id: number;
  name: string;
  description?: string;
  parentId?: number;
  therapeuticClass: string;
  atcCode?: string;
  active: boolean;
  sortOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MedicineCategoryCreationAttributes extends Optional<MedicineCategoryAttributes, "id" | "createdAt" | "updatedAt"> {}

export class MedicineCategory extends Model<MedicineCategoryAttributes, MedicineCategoryCreationAttributes> implements MedicineCategoryAttributes {
  public id!: number;
  public name!: string;
  public description?: string;
  public parentId?: number;
  public therapeuticClass!: string;
  public atcCode?: string;
  public active!: boolean;
  public sortOrder!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MedicineCategory.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    therapeuticClass: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    atcCode: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    tableName: "medicine_categories",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["name"], name: "unique_category_name" },
      { fields: ["parentId"], name: "category_parent_index" },
      { fields: ["therapeuticClass"], name: "category_therapeutic_index" },
      { fields: ["active"], name: "category_active_index" },
    ],
  }
);

// Self-referencing relationship for hierarchical categories
MedicineCategory.belongsTo(MedicineCategory, { foreignKey: 'parentId', as: 'parent' });
MedicineCategory.hasMany(MedicineCategory, { foreignKey: 'parentId', as: 'subcategories' });

export default MedicineCategory;
