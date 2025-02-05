const usersController = require("../../../controllers/users");
const User = require("../../../models/User");

// Mock response methods
const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();

// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(() => ({
    send: mockSend, 
    json: mockJson, 
    end: mockEnd 
}));

const mockRes = { status: mockStatus };

describe("Users Controller", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  describe("index", () => {
    it("should return users with a status code 200", async () => {
      // Arrange
      const testUsers = [
        { student_id: 1, firstName: "Ben", lastName: "Eren", student_login: "beren", password: "beren123" },
        { student_id: 2, firstName: "Abdul", lastName: "Mirza", student_login: "amirza", password: "amirza123" },
      ];
      jest.spyOn(User, "getAllStudents").mockResolvedValue(testUsers);

      // Act
      await usersController.index(null, mockRes);

      // Assert
      expect(User.getAllStudents).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(testUsers);
    });

    it("should return an error upon failure", async () => {
      // Arrange
      jest.spyOn(User, "getAllStudents").mockRejectedValue(new Error("Database error"));

      // Act
      await usersController.index(null, mockRes);

      // Assert
      expect(User.getAllStudents).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: "Database error" });
    });
  });

  describe("register", () => {
    it("should successfully create a new user and return it with a 201 status code", async () => {
      // Arrange
      const testUser = { firstName: "Abdul", lastName: "Mirza", student_login: "amirza", password: "amirza123" };
      const mockReq = { body: testUser };

      jest.spyOn(User, "create").mockResolvedValue(testUser);

      // Act
      await usersController.register(mockReq, mockRes);

      // Assert
      expect(User.create).toHaveBeenCalledWith(testUser);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockSend).toHaveBeenCalledWith(testUser);
    });

    it("should return an error if registration fails", async () => {
      // Arrange
      const mockReq = { body: { firstName: "Natasha" } };
      jest.spyOn(User, "create").mockRejectedValue(new Error("Invalid data"));

      // Act
      await usersController.register(mockReq, mockRes);

      // Assert
      expect(User.create).toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid data" });
    });
  });
});
