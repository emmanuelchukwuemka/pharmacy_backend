import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

export class ComplianceDocument extends Model {
  public id!: number;
  public pharmacyId!: number;
  public documentType!: string;
  public documentName!: string;
  public documentUrl!: string;
  public expiryDate?: Date;
  public status!: "pending" | "approved" | "rejected" | "expired";
  public verifiedBy?: number;
  public verifiedAt?: Date;
  public rejectionReason?: string;
  public region!: string;
  public regulatoryBody!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

ComplianceDocument.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pharmacyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "pharmacies",
        key: "id",
      },
    },
    documentType: {
      type: DataTypes.ENUM(
        "pharmacy_license",
        "controlled_substance_license",
        "dea_registration",
        "state_license",
        "nabp_verification",
        "insurance_credentialing",
        "background_check",
        "business_license",
        "tax_certificate",
        "professional_liability_insurance"
      ),
      allowNull: false,
    },
    documentName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    documentUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected", "expired"),
      allowNull: false,
      defaultValue: "pending",
    },
    verifiedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    verifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    rejectionReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "US",
    },
    regulatoryBody: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ComplianceDocument",
    tableName: "compliance_documents",
    timestamps: true,
    indexes: [
      { fields: ["pharmacyId"], name: "idx_compliance_pharmacy" },
      { fields: ["status"], name: "idx_compliance_status" },
      { fields: ["documentType"], name: "idx_compliance_type" },
      { fields: ["expiryDate"], name: "idx_compliance_expiry" },
    ],
  }
);

export default ComplianceDocument;
