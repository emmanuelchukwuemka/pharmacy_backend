import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

export class PricingTier extends Model {
  public id!: number;
  public medicineId!: number;
  public pharmacyId!: number;
  public minQuantity!: number;
  public maxQuantity!: number;
  public price!: number;
  public discountPercentage!: number;
  public isActive!: boolean;
  public region!: string;
  public currency!: string;
  public effectiveFrom!: Date;
  public effectiveTo?: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
}

PricingTier.init(
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
    minQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    maxQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discountPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    region: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "global",
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: "USD",
    },
    effectiveFrom: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    effectiveTo: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "PricingTier",
    tableName: "pricing_tiers",
    timestamps: true,
    indexes: [
      { fields: ["medicineId", "pharmacyId"], name: "idx_pricing_medicine_pharmacy" },
      { fields: ["region"], name: "idx_pricing_region" },
      { fields: ["isActive"], name: "idx_pricing_active" },
    ],
  }
);

export default PricingTier;
