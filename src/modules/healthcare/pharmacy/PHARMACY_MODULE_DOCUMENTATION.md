# Pharmacy Module Documentation

## Overview

The Pharmacy Module is a comprehensive backend component of the healthcare system designed to manage pharmacy operations, including registration, medicine inventory, prescription handling, order processing, and compliance tracking. This module provides RESTful APIs for pharmacy management, ensuring secure and efficient operations in compliance with healthcare regulations.

### How It Works

The Pharmacy Module operates as a microservice within the larger healthcare ecosystem, providing end-to-end pharmacy management capabilities. It integrates with the authentication system for secure access control and maintains comprehensive audit trails for regulatory compliance.

**Core Functionality:**
- **Pharmacy Onboarding**: Secure registration and verification process
- **Inventory Management**: Real-time stock tracking with automated alerts
- **Prescription Processing**: Digital prescription verification and management
- **Order Fulfillment**: Complete order lifecycle from placement to delivery
- **Compliance Monitoring**: Automated audit trails and regulatory reporting
- **Analytics Dashboard**: Business intelligence and performance metrics

## Architecture

The module follows a layered architecture pattern with clear separation of concerns:

### Folder Structure

```
src/modules/healthcare/pharmacy/
├── index.ts                    # Module entry point and routing setup
├── pharmacy.controllers.ts     # HTTP request handlers
├── pharmacy.services.ts        # Business logic and database operations
├── pharmacy.routes.ts          # API endpoint definitions
├── pharmacy.models.ts          # Sequelize data models
├── pharmacy.validations.ts     # Input validation schemas (Zod)
├── pharmacy.middlewares.ts     # Authentication and authorization
├── pharmacy.helpers.ts         # Utility functions
├── pharmacy.types.ts           # TypeScript type definitions
└── pharmacy_models/            # Additional model files
    ├── AuditLog.model.ts
    ├── BatchTracking.model.ts
    ├── ComplianceDocument.model.ts
    ├── Customer.model.ts
    ├── Inventory.model.ts
    ├── Medicine.model.ts
    ├── MedicineCategory.model.ts
    ├── MedicineInteraction.model.ts
    ├── MedicineVariation.model.ts
    ├── Order.model.ts
    ├── OrderItem.model.ts
    ├── Pharmacy.model.ts
    ├── Prescription.model.ts
    ├── PricingTier.model.ts
    ├── ShippingCarrier.model.ts
    └── User.model.ts
```

### Key Components

- **Controllers**: Handle HTTP requests, validate inputs, and return responses
- **Services**: Contain business logic, database interactions, and complex operations
- **Routes**: Define API endpoints and apply middleware
- **Models**: Represent database tables and relationships
- **Validations**: Ensure data integrity using Zod schemas
- **Middlewares**: Handle authentication, authorization, and request processing

## API Endpoints

All endpoints require authentication with a JWT token containing `role: "pharmacy"`. The base path is `/api/pharmacy/`.

### Pharmacy Management

#### Register Pharmacy
- **POST** `/register`
- **Description**: Register a new pharmacy and create owner account
- **Body**:
  ```json
  {
    "name": "Health Pharmacy",
    "email": "contact@healthpharmacy.com",
    "phone": "+1234567890",
    "address": "123 Main St, City, State",
    "licenseNumber": "PHARM-12345",
    "ownerName": "John Doe",
    "businessType": "independent",
    "operatingHours": {
      "monday": {"open": "09:00", "close": "18:00"},
      "tuesday": {"open": "09:00", "close": "18:00"},
      // ... other days
    },
    "services": ["prescription", "over-the-counter"]
  }
  ```
- **Response**: Pharmacy registration details with verification token

#### Verify Email
- **POST** `/verify-email`
- **Description**: Verify pharmacy email using token
- **Body**: `{"token": "verification_token"}`

#### Get Pharmacy Profile
- **GET** `/profile`
- **Description**: Retrieve pharmacy profile information

#### Update Pharmacy Profile
- **PUT** `/profile`
- **Description**: Update pharmacy profile details

#### Verify License
- **POST** `/verify-license`
- **Description**: Submit license documents for verification

### Medicine Management

#### Add Medicine
- **POST** `/medicines`
- **Description**: Add a new medicine to inventory
- **Body**:
  ```json
  {
    "name": "Paracetamol",
    "genericName": "Acetaminophen",
    "brandName": "Tylenol",
    "description": "Pain relief medication",
    "category": "Analgesic",
    "dosage": "500mg",
    "form": "tablet",
    "strength": "500",
    "unit": "mg",
    "prescriptionRequired": false,
    "price": 5.99,
    "stockQuantity": 100,
    "expiryDate": "2024-12-31",
    "batchNumber": "BATCH-001",
    "manufacturer": "Pharma Corp",
    "sideEffects": ["nausea", "dizziness"],
    "interactions": ["alcohol"]
  }
  ```

#### Get Medicines
- **GET** `/medicines?page=1&limit=10&search=paracetamol&category=Analgesic`
- **Description**: Retrieve paginated list of medicines with optional filters

#### Update Medicine
- **PUT** `/medicines/:id`
- **Description**: Update medicine details

#### Delete Medicine
- **DELETE** `/medicines/:id`
- **Description**: Remove medicine from inventory

### Inventory Management

#### Add Inventory
- **POST** `/inventory`
- **Description**: Add stock to existing medicine

#### Get Inventory
- **GET** `/inventory?page=1&limit=10&search=paracetamol&lowStock=true`
- **Description**: Retrieve inventory with low stock alerts

#### Update Inventory
- **PUT** `/inventory/:id`
- **Description**: Update inventory details

### Order Management

#### Get Orders
- **GET** `/orders?page=1&limit=10&status=pending&search=order123`
- **Description**: Retrieve pharmacy orders

#### Process Order
- **PUT** `/orders/:id/process`
- **Description**: Mark order as processing

#### Ship Order
- **POST** `/orders/:id/ship`
- **Description**: Ship processed order

### Prescription Management

#### Verify Prescription
- **POST** `/prescriptions/verify`
- **Description**: Verify and record prescription

#### Get Prescriptions
- **GET** `/prescriptions?page=1&limit=10&status=verified`
- **Description**: Retrieve prescriptions

### Analytics

#### Get Dashboard Analytics
- **GET** `/analytics/dashboard?period=30d`
- **Description**: Retrieve dashboard metrics (orders, revenue, low stock)

#### Get Sales Analytics
- **GET** `/analytics/sales?startDate=2024-01-01&endDate=2024-01-31`
- **Description**: Retrieve sales data over date range

### Compliance & Audit

#### Get Compliance Reports
- **GET** `/compliance/reports?type=prescription&period=30d`
- **Description**: Retrieve compliance reports

#### Get Audit Trail
- **GET** `/compliance/audit?page=1&limit=10&action=CREATE&entityType=medicine`
- **Description**: Retrieve audit logs

#### Check Medicine Interactions
- **POST** `/medicines/interactions`
- **Body**: `{"medicineIds": [1, 2, 3]}`
- **Description**: Check for drug interactions

## Data Models

### Pharmacy Model
Represents a pharmacy entity with registration and operational details.

```typescript
interface PharmacyAttributes {
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
```

### Medicine Model
Represents medicines available in the pharmacy.

```typescript
interface MedicineAttributes {
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
```

### Inventory Model
Tracks stock levels and batch information.

```typescript
interface InventoryAttributes {
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
```

### Order & Prescription Models
Handle customer orders and prescription management with full audit trails.

## Security & Middleware

### Authentication
- JWT-based authentication required for all endpoints
- Token must contain `role: "pharmacy"`
- Automatic token verification and user context injection

### Authorization
- `pharmacySecure`: Validates JWT and pharmacy role
- `requireLicenseVerification`: Ensures pharmacy license is verified
- `validatePrescription`: Checks prescription requirements for controlled substances

### Data Validation
- Comprehensive input validation using Zod schemas
- Type-safe request/response handling
- Automatic error responses for validation failures

## How the System Works

### System Architecture Flow

```
Client Request → Express Router → Middleware Chain → Controller → Service Layer → Database/Models → Response
```

1. **Request Processing**: All requests pass through Express routers with middleware validation
2. **Authentication**: JWT tokens are verified and user context is injected
3. **Authorization**: Role-based access control ensures appropriate permissions
4. **Business Logic**: Services handle complex operations and database interactions
5. **Data Persistence**: Sequelize ORM manages database operations with transactions
6. **Audit Logging**: All changes are automatically logged for compliance

### Detailed Workflows

#### Pharmacy Registration & Onboarding Process

```
1. Pharmacy submits registration form
   ↓
2. Validation: Check for duplicate email/license
   ↓
3. Database: Create pharmacy record (status: 'pending')
   ↓
4. User Account: Create owner account with temporary password
   ↓
5. Email: Generate verification token and send email
   ↓
6. Response: Return registration success with token
   ↓
7. Email Verification: Pharmacy clicks email link
   ↓
8. Database: Update user status to verified/active
   ↓
9. License Verification: Manual review process
   ↓
10. Final Activation: Pharmacy status set to 'verified'
```

**Key Features:**
- Duplicate prevention for email and license numbers
- Secure token generation using nanoid
- Multi-step verification process for regulatory compliance
- Automatic account creation with encrypted passwords

#### Medicine Inventory Management

```
Medicine Addition Flow:
1. Validate medicine data against schema
   ↓
2. Check for existing medicine (prevent duplicates)
   ↓
3. Create medicine record in database
   ↓
4. Initialize inventory with provided stock
   ↓
5. Log audit entry for compliance
   ↓
6. Return success response with medicine details

Stock Management:
- Real-time quantity tracking
- Batch number and expiry date monitoring
- Automatic low-stock alerts (< 10 units)
- FIFO (First In, First Out) inventory rotation
```

#### Prescription Processing Workflow

```
Digital Prescription Flow:
1. Doctor creates prescription (external system)
   ↓
2. Patient presents prescription to pharmacy
   ↓
3. Pharmacy scans/verifies prescription authenticity
   ↓
4. System validates prescription data
   ↓
5. Check medicine availability in inventory
   ↓
6. Verify prescription hasn't been filled
   ↓
7. Process prescription and update inventory
   ↓
8. Log prescription access for compliance
   ↓
9. Generate receipt and update patient records
```

#### Order Fulfillment Process

```
Order Processing:
1. Customer places order (external system)
   ↓
2. Pharmacy receives order notification
   ↓
3. Validate order items against inventory
   ↓
4. Check prescription requirements
   ↓
5. Reserve inventory (soft hold)
   ↓
6. Process payment (external integration)
   ↓
7. Update order status to 'processing'
   ↓
8. Prepare order for shipping
   ↓
9. Generate shipping label and tracking
   ↓
10. Update order status to 'shipped'
    ↓
11. Release inventory hold
    ↓
12. Log all activities for audit trail
```

### Data Flow Architecture

#### Read Operations (GET requests)
```
Client → API Gateway → Authentication → Authorization → Controller → Service → Database Query → Data Transformation → Response
```

#### Write Operations (POST/PUT/DELETE)
```
Client → API Gateway → Authentication → Authorization → Validation → Controller → Service → Transaction Begin → Business Logic → Database Write → Audit Log → Transaction Commit → Response
```

### Security Implementation

#### Authentication Flow
```
1. User provides credentials
   ↓
2. System validates credentials against database
   ↓
3. Generate JWT token with user info and role
   ↓
4. Return token to client
   ↓
5. Client includes token in subsequent requests
   ↓
6. Server validates token on each request
   ↓
7. Extract user context and permissions
```

#### Authorization Matrix
- **Pharmacy Owner**: Full access to their pharmacy's data
- **Pharmacist**: Medicine management, prescription processing
- **Staff**: Limited access for order processing
- **System**: Automated processes (analytics, alerts)

### Business Logic Features

#### Inventory Management Intelligence
- **Expiry Monitoring**: Automatic alerts 30 days before expiry
- **Low Stock Alerts**: Configurable thresholds per medicine
- **Batch Tracking**: Complete traceability from supplier to customer
- **Cost Management**: Purchase vs selling price optimization
- **Demand Forecasting**: Historical data analysis for reordering

#### Compliance & Audit System
- **Complete Audit Trail**: Every database change is logged
- **Regulatory Reporting**: Automated compliance report generation
- **Prescription Tracking**: Full lifecycle monitoring
- **Access Logging**: Who accessed what prescription and when
- **Data Integrity**: Cryptographic hashing for tamper detection

#### Analytics Engine
- **Real-time Metrics**: Dashboard updates every 5 minutes
- **Sales Forecasting**: Trend analysis and prediction models
- **Performance KPIs**: Order fulfillment rates, customer satisfaction
- **Inventory Turnover**: Optimize stock levels and reduce waste
- **Revenue Analytics**: Profit margins and sales channel analysis

### Error Handling & Recovery

#### Error Classification
- **Validation Errors**: Client input issues (400 status)
- **Authentication Errors**: Invalid/missing tokens (401 status)
- **Authorization Errors**: Insufficient permissions (403 status)
- **Business Logic Errors**: Domain rule violations (409 status)
- **System Errors**: Database/server issues (500 status)

#### Recovery Mechanisms
- **Transaction Rollback**: Failed operations automatically reversed
- **Circuit Breaker**: Prevent cascade failures in distributed systems
- **Retry Logic**: Automatic retry for transient failures
- **Fallback Responses**: Graceful degradation during outages
- **Error Logging**: Comprehensive error tracking for debugging

### Performance Optimization

#### Database Optimization
- **Indexing Strategy**: Optimized indexes on frequently queried fields
- **Query Caching**: Redis caching for frequently accessed data
- **Connection Pooling**: Efficient database connection management
- **Read Replicas**: Separate read/write database instances

#### API Performance
- **Response Compression**: Gzip compression for large payloads
- **Pagination**: Efficient handling of large datasets
- **Rate Limiting**: Prevent abuse and ensure fair usage
- **Async Processing**: Non-blocking operations for better throughput

### Integration Points

#### External Systems
- **Email Service**: Verification emails and notifications
- **Payment Gateway**: Secure payment processing
- **Shipping Providers**: Real-time tracking integration
- **Insurance Systems**: Claim processing and verification
- **Regulatory Databases**: License validation and compliance checks

#### Internal Modules
- **Authentication Module**: User management and JWT handling
- **Notification Module**: Email and SMS alerts
- **Reporting Module**: Advanced analytics and dashboards
- **Audit Module**: Centralized compliance logging

## Error Handling

The module implements comprehensive error handling:

- **Validation Errors** (400): Invalid input data
- **Authentication Errors** (401): Missing or invalid tokens
- **Authorization Errors** (403): Insufficient permissions
- **Not Found Errors** (404): Resource not found
- **Server Errors** (500): Internal server errors

All errors return standardized JSON responses with error codes and messages.

## Usage Examples

### Registering a Pharmacy
```bash
curl -X POST http://localhost:3000/api/pharmacy/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "City Pharmacy",
    "email": "info@citypharmacy.com",
    "phone": "+1234567890",
    "address": "456 Health Ave, City, State 12345",
    "licenseNumber": "PHARM-67890",
    "ownerName": "Jane Smith",
    "businessType": "independent",
    "operatingHours": {
      "monday": {"open": "08:00", "close": "20:00"},
      "tuesday": {"open": "08:00", "close": "20:00"},
      "wednesday": {"open": "08:00", "close": "20:00"},
      "thursday": {"open": "08:00", "close": "20:00"},
      "friday": {"open": "08:00", "close": "20:00"},
      "saturday": {"open": "09:00", "close": "18:00"},
      "sunday": {"open": "10:00", "close": "16:00"}
    },
    "services": ["prescription", "over-the-counter", "vaccinations"]
  }'
```

### Adding Medicine
```bash
curl -X POST http://localhost:3000/api/pharmacy/medicines \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ibuprofen",
    "genericName": "Ibuprofen",
    "brandName": "Advil",
    "description": "Non-steroidal anti-inflammatory drug",
    "category": "NSAID",
    "dosage": "200mg",
    "form": "tablet",
    "strength": "200",
    "unit": "mg",
    "prescriptionRequired": false,
    "price": 8.99,
    "stockQuantity": 50,
    "expiryDate": "2025-06-30",
    "batchNumber": "IBU-2024-001",
    "manufacturer": "PharmaCorp",
    "sideEffects": ["stomach upset", "dizziness"],
    "interactions": ["aspirin", "warfarin"]
  }'
```

## Dependencies

- **Express.js**: Web framework
- **Sequelize**: ORM for database operations
- **Zod**: Schema validation
- **JWT**: Authentication
- **Bcrypt**: Password hashing
- **Nanoid**: Token generation

## Database Schema

The module uses the following main tables:
- `pharmacies`: Pharmacy information
- `medicines`: Medicine catalog
- `inventory`: Stock tracking
- `orders`: Customer orders
- `order_items`: Order line items
- `prescriptions`: Prescription records
- `audit_logs`: Operation audit trail
- `medicine_interactions`: Drug interaction data

## Future Enhancements

- Integration with external pharmacy networks
- Automated inventory reordering
- Advanced reporting and analytics
- Mobile app API support
- Integration with insurance providers
- Barcode scanning for inventory
- Automated prescription processing

## Support

For technical support or questions about the Pharmacy Module, please contact the development team or refer to the main project documentation.
