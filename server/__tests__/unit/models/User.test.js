const db = require("../../../db/connect");
const User = require("../../../models/User");

describe("User", () => {
    beforeEach(() => jest.clearAllMocks());
    afterAll(() => jest.resetAllMocks());
  
    describe("getAllStudents", () => {
      it("resolves with users on successful db query", async () => {
        // Arrange
        const mockUsers = [
          { student_id: 1, firstName: "Ben", lastName: "Eren", student_login: "beren", password: "beneren123" },
          { student_id: 2, firstName: "Abdul", lastName: "Mirza", student_login: "amirza", password: "amirza123" },
        ];
        jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockUsers });
  
        // Act
        const students = await User.getAllStudents();
  
        // Assert
        expect(students).toHaveLength(2);
        expect(students[0]).toHaveProperty("student_id");
        expect(students[0].firstName).toBe("Ben");
        expect(db.query).toHaveBeenCalledWith("SELECT * FROM students;");
      });
  
      it("should throw an Error when no students are found", async () => {
        // Arrange
        jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });
  
        // Act & Assert
        await expect(User.getAllStudents()).rejects.toThrow("No students found!");
      });
    });
  
    describe("getOneById", () => {
      it("resolves with user on successful db query", async () => {
        // Arrange
        const testUser = { student_id: 1, firstName: "John", lastName: "Doe", student_login: "jdoe", password: "hashedpass" };
        jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testUser] });
  
        // Act
        const result = await User.getOneById(1);
  
        // Assert
        expect(result).toBeInstanceOf(User);
        expect(result.firstName).toBe("John");
        expect(result.student_id).toBe(1);
        expect(db.query).toHaveBeenCalledWith("SELECT * FROM students WHERE student_id = $1;", [1]);
      });
  
      it("should throw an Error when user is not found", async () => {
        // Arrange
        jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });
  
        // Act & Assert
        await expect(User.getOneById(999)).rejects.toThrow("Student does not exist!");
      });
    });
  
    describe("getOneByStudentLogin", () => {
      it("resolves with user on successful db query", async () => {
        // Arrange
        const testUser = { student_id: 1, firstName: "John", lastName: "Doe", student_login: "jdoe", password: "hashedpass" };
        jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testUser] });
  
        // Act
        const result = await User.getOneByStudentLogin("jdoe");
  
        // Assert
        expect(result).toBeInstanceOf(User);
        expect(result.firstName).toBe("John");
        expect(result.student_login).toBe("jdoe");
        expect(db.query).toHaveBeenCalledWith("SELECT * FROM students WHERE student_login = $1;", ["jdoe"]);
      });
  
      it("should throw an Error when user is not found", async () => {
        // Arrange
        jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });
  
        // Act & Assert
        await expect(User.getOneByStudentLogin("unknown_user")).rejects.toThrow("Student does not exist!");
      });
    });
  
    describe("create", () => {
      it("resolves with user on successful creation", async () => {
        // Arrange
        const userData = { firstName: "Alice", lastName: "Smith", student_login: "asmith", password: "hashedpass" };
        jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{ student_id: 1, ...userData }] });
  
        // Act
        const result = await User.create(userData);
  
        // Assert
        expect(result).toBeInstanceOf(User);
        expect(result).toHaveProperty("student_id", 1);
        expect(result).toHaveProperty("firstName", "Alice");
        expect(db.query).toHaveBeenCalledWith(
          "INSERT INTO students (firstName, lastName, student_login, password) VALUES ($1, $2, $3, $4) RETURNING *;",
          [userData.firstName, userData.lastName, userData.student_login, userData.password]
        );
      });
  
      it("should throw an Error when required fields are missing", async () => {
        // Arrange
        const incompleteUserData = { firstName: "Alice" };
  
        // Act & Assert
        await expect(User.create(incompleteUserData)).rejects.toThrow();
      });
    });
  });