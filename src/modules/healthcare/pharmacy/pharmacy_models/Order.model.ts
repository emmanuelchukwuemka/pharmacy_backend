import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../../config/database/sequelize";

export interface OrderAttributes {
  id: number;
  orderNumber: string;
  customerId: number;
  pharmacyId: number;
  prescriptionId?: number;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  totalAmount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'cash' | 'card' | 'insurance' | 'online';
  shippingAddress: string;
  billingAddress: string;
  deliveryMethod: 'pickup' | 'delivery' | 'express' | 'international';
  shippingCarrier?: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  specialInstructions?: string;
  requiresPrescription: boolean;
  controlledSubstances: boolean;
  insuranceClaimId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderItem {
  medicineId: number;
  medicineName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  batchNumber?: string;
  expiryDate?: Date;
  prescriptionRequired: boolean;
}

export interface OrderCreationAttributes extends Optional<OrderAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public orderNumber!: string;
  public customerId!: number;
  public pharmacyId!: number;
  public prescriptionId?: number;
  public items!: OrderItem[];
  public subtotal!: number;
  public tax!: number;
  public discount!: number;
  public totalAmount!: number;
  public currency!: string;
  public status!: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  public paymentStatus!: 'pending' | 'paid' | 'failed' | 'refunded';
  public paymentMethod!: 'cash' | 'card' | 'insurance' | 'online';
  public shippingAddress!: string;
  public billingAddress!: string;
  public deliveryMethod!: 'pickup' | 'delivery' | 'express' | 'international';
  public shippingCarrier?: string;
  public trackingNumber?: string;
  public estimatedDelivery?: Date;
  public actualDelivery?: Date;
  public specialInstructions?: string;
  public requiresPrescription!: boolean;
  public controlledSubstances!: boolean;
  public insuranceClaimId?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pharmacyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    prescriptionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    items: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    tax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'USD',
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'),
      allowNull: false,
      defaultValue: 'pending',
    },
    paymentStatus: {
      type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
      allowNull: false,
      defaultValue: 'pending',
    },
    paymentMethod: {
      type: DataTypes.ENUM('cash', 'card', 'insurance', 'online'),
      allowNull: false,
    },
    shippingAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    billingAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    deliveryMethod: {
      type: DataTypes.ENUM('pickup', 'delivery', 'express', 'international'),
      allowNull: false,
    },
    shippingCarrier: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    trackingNumber: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    estimatedDelivery: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    actualDelivery: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    specialInstructions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    requiresPrescription: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    controlledSubstances: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    insuranceClaimId: {
      type: DataTypes.STRING(100),
      allowNull: true,
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
    tableName: "orders",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["orderNumber"], name: "unique_order_number" },
      { fields: ["customerId"], name: "order_customer_index" },
      { fields: ["pharmacyId"], name: "order_pharmacy_index" },
      { fields: ["status"], name: "order_status_index" },
      { fields: ["paymentStatus"], name: "order_payment_status_index" },
      { fields: ["createdAt"], name: "order_date_index" },
    ],
  }
);

export default Order;
