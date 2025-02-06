const db = require("../../../db/connect");
const User = require("../../../models/User");

describe("User", () => {
    beforeEach(() => jest.clearAllMocks());
    afterAll(() => jest.resetAllMocks());

    describe("getOneByStudentLogin", () => {
        it("resolves with user on successful db query", async () => {
            // Arrange
            const mockUser = {
                student_id: 1,
                firstName: "Alice",
                lastName: "Johnson",
                student_login: "alice_j",
                password: "hashed_password",
            };
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [mockUser] });

            // Act
            const result = await User.getOneByStudentLogin("alice_j");

            // Assert
            expect(result).toBeInstanceOf(User);
            expect(result.student_login).toBe("alice_j");
            expect(db.query).toHaveBeenCalledWith(
                "SELECT * FROM students WHERE student_login = $1;",
                ["alice_j"]
            );
        });

        it("should throw an Error when user is not found", async () => {
            // Arrange
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

            // Act & Assert
            await expect(User.getOneByStudentLogin("non_existent_user")).rejects.toThrow(
                "Student does not exist!"
            );
        });
    });

    describe("marks", () => {
        it("should initialize marks for a student with total_marks as 0", async () => {
            // Arrange
            const mockMarks = { student_id: 1, total_marks: 0 };
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [mockMarks] });

            // Act
            const result = await User.marks(1);

            // Assert
            expect(result).toHaveProperty("student_id", 1);
            expect(result).toHaveProperty("total_marks", 0);
            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO marks (student_id, total_marks) VALUES ($1, $2) RETURNING *;",
                [1, 0]
            );
        });
    });

    describe("create", () => {
        it("should create a new user and return the user instance", async () => {
            // Arrange
            const userData = {
                firstName: "John",
                lastName: "Doe",
                student_login: "johndoe",
                password: "hashed_password",
            };

            const mockUser = { ...userData, student_id: 1 };
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [mockUser] });
            jest.spyOn(User, "marks").mockResolvedValueOnce({ student_id: 1, total_marks: 0 });

            // Act
            const result = await User.create(userData);

            // Assert
            expect(result).toBeInstanceOf(User);
            expect(result.firstName).toBe("John");
            expect(result.student_login).toBe("johndoe");
            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO students (firstName, lastName, student_login, password) VALUES ($1, $2, $3, $4) RETURNING *;",
                ["John", "Doe", "johndoe", "hashed_password"]
            );
            expect(User.marks).toHaveBeenCalledWith(1);
        });

        it("should throw an Error when required fields are missing", async () => {
            // Arrange
            const incompleteUserData = { firstName: "Alice" };

            // Act & Assert
            await expect(User.create(incompleteUserData)).rejects.toThrow();
        });
    });
});
