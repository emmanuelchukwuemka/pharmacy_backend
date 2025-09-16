"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const App_1 = __importDefault(require("../src/App"));
describe("Pharmacy API Integration Tests", () => {
    let authToken;
    beforeAll(async () => {
        // Register a pharmacy user
        const registerResponse = await (0, supertest_1.default)(App_1.default)
            .post("/api/healthcare/pharmacy/register")
            .send({
            name: "Test Pharmacy",
            email: "testpharmacy@example.com",
            phone: "+1234567890",
            password: "TestPass123!",
            licenseNumber: "PHARM-12345"
        });
        expect(registerResponse.status).toBe(201);
        // TODO: Add email verification step here if needed
        // Login to get auth token
        const loginResponse = await (0, supertest_1.default)(App_1.default)
            .post("/api/healthcare/pharmacy/login")
            .send({
            email: "testpharmacy@example.com",
            password: "TestPass123!"
        });
        expect(loginResponse.status).toBe(200);
        authToken = loginResponse.body.data.token;
    });
    test("Get pharmacy profile", async () => {
        const res = await (0, supertest_1.default)(App_1.default)
            .get("/api/healthcare/pharmacy/profile")
            .set("Authorization", `Bearer ${authToken}`);
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("email", "testpharmacy@example.com");
    });
    // Additional tests for other endpoints can be added here
});
