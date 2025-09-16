import request from "supertest";
import app from "../src/App";

describe("Pharmacy API Integration Tests", () => {
  let authToken: string;

  beforeAll(async () => {
    // Register a pharmacy user
    const registerResponse = await request(app)
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
    const loginResponse = await request(app)
      .post("/api/healthcare/pharmacy/login")
      .send({
        email: "testpharmacy@example.com",
        password: "TestPass123!"
      });
    expect(loginResponse.status).toBe(200);
    authToken = loginResponse.body.data.token;
  });

  test("Get pharmacy profile", async () => {
    const res = await request(app)
      .get("/api/healthcare/pharmacy/profile")
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("email", "testpharmacy@example.com");
  });

  // Additional tests for other endpoints can be added here
});
