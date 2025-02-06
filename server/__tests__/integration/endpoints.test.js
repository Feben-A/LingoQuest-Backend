const request = require("supertest");
const { resetTestDB } = require("./config");
const app = require("../../app");

describe("API Integration Tests", () => {
  let api;

  beforeAll(() => {
    api = app.listen(4000, () => {
      console.log("Test server running on port 4000");
    });
  });

  beforeEach(async () => {
    await resetTestDB();
  });

  afterAll((done) => {
    console.log("Gracefully closing server");
    api.close(done);
  });

  describe("Users API", () => {
    it("should register a new user", async () => {
      const newUser = {
        firstName: "John",
        lastName: "Doe",
        student_login: "johndoe",
        password: "secret123",
      };

      const res = await request(api).post("/users/register").send(newUser);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("student_id");
    });

    it("should login a user", async () => {
      const loginData = { student_login: "johndoe", password: "secret123" };
      const res = await request(api).post("/users/login").send(loginData);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
    });
  });

  describe("Marks API", () => {
    it("should return leaderboard", async () => {
      const res = await request(api).get("/student/marks/leaders");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("Translate API", () => {
    it("should return translation questions", async () => {
      const res = await request(api).get("/spanish/games/translate/easy");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
