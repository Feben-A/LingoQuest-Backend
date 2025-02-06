const usersController = require("../../../controllers/users");
const User = require("../../../models/User");

// Mocking response methods
const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();

const mockStatus = jest.fn(() => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd,
}));

const mockRes = { status: mockStatus };

describe("Users Controller", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  describe("show", () => {
    let testUser, mockReq;

    beforeEach(() => {
      testUser = {
        student_id: 1,
        firstName: "John",
        lastName: "Doe",
        student_login: "johndoe",
      };
      mockReq = { user: { student_login: "johndoe" } };
    });

    it("should return user details with a 200 status code", async () => {
      jest.spyOn(User, "getOneByStudentLogin").mockResolvedValue(new User(testUser));

      await usersController.show(mockReq, mockRes);

      expect(User.getOneByStudentLogin).toHaveBeenCalledWith("johndoe");
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(new User(testUser));
    });

    it("should return an error if the user is not found", async () => {
      jest.spyOn(User, "getOneByStudentLogin").mockRejectedValue(new Error("User not found"));

      await usersController.show(mockReq, mockRes);

      expect(User.getOneByStudentLogin).toHaveBeenCalledWith("johndoe");
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ err: "User not found" });
    });
  });

  describe("register", () => {
    it("should successfully create a new user and return it with a 201 status code", async () => {
      let testUserData = {
        firstName: "Alice",
        lastName: "Smith",
        student_login: "alicesmith",
      };

      let mockCreatedUser = { ...testUserData, student_id: 2 };

      jest.spyOn(User, "create").mockResolvedValue(new User(mockCreatedUser));

      const mockReq = { body: testUserData };

      await usersController.register(mockReq, mockRes);

      expect(User.create).toHaveBeenCalledWith(testUserData);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockSend).toHaveBeenCalledWith(new User(mockCreatedUser));
    });

    it("should return an error if registration fails", async () => {
      const testUserData = {
        firstName: "Alice",
        lastName: "Smith",
        student_login: "alicesmith",
      };

      jest.spyOn(User, "create").mockRejectedValue(new Error("Registration failed"));

      const mockReq = { body: testUserData };

      await usersController.register(mockReq, mockRes);

      expect(User.create).toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: "Registration failed" });
    });
  });

  describe("login", () => {
    it("should return an error if user does not exist", async () => {
      let testCredentials = {
        student_login: "nonexistent",
      };

      jest.spyOn(User, "getOneByStudentLogin").mockRejectedValue(new Error("No student with this student id."));

      const mockReq = { body: testCredentials };

      await usersController.login(mockReq, mockRes);

      expect(User.getOneByStudentLogin).toHaveBeenCalledWith("nonexistent");
      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledWith({ error: "No student with this student id." });
    });
  });
});
