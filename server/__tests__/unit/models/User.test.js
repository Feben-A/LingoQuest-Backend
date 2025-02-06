const db = require("../../../db/connect");
const User = require("../../../models/User");

describe("User Model", () => {
    beforeEach(() => jest.clearAllMocks());
    afterAll(() => jest.resetAllMocks());

    describe("getAllStudents", () => {
        it("should return a list of students on successful db query", async () => {
            const mockUsers = [
                { student_id: 1, firstName: "Ben", lastName: "Eren", student_login: "beren", password: "beneren123" },
                { student_id: 2, firstName: "Abdul", lastName: "Mirza", student_login: "amirza", password: "amirza123" }
            ];
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockUsers });
            
            const result = await User.getAllStudents();
            
            expect(result).toHaveLength(2);
            expect(result[0]).toHaveProperty("student_id");
            
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM students;");
        });

        it("should throw an Error when no students are found", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });
            await expect(User.getAllStudents()).rejects.toThrow("No students found!");
        });
    });

    describe("getOneById", () => {
        it("should return a user on successful db query", async () => {
            const testUser = { student_id: 1, firstName: "John", lastName: "Doe", student_login: "jdoe", password: "hashedpass" };
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testUser] });
            
            const result = await User.getOneById(1);
            
            expect(result).toBeInstanceOf(User);
            expect(result.firstName).toBe("John");
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM students WHERE student_id = $1;", [1]);
        });

        it("should throw an Error when user is not found", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });
            await expect(User.getOneById(999)).rejects.toThrow("Student does not exist!");
        });
    });

    describe("create", () => {
        it("should create a new user and return the user instance", async () => {
            const userData = { firstName: "Alice", lastName: "Smith", student_login: "asmith", password: "password123" };
            const response = { rows: [{ student_id: 1, ...userData }] };
            jest.spyOn(db, "query").mockResolvedValueOnce(response);
            
            const result = await User.create(userData);
            
            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO students (firstName, lastName, student_login, password) VALUES ($1, $2, $3, $4) RETURNING *;",
                [userData.firstName, userData.lastName, userData.student_login, userData.password]
            );
            expect(result).toBeInstanceOf(User);
        });

        it("should throw an Error when required fields are missing", async () => {
            const incompleteUserData = { firstName: "Alice" };
            await expect(User.create(incompleteUserData)).rejects.toThrow("Missing required fields");
        });
    });
});
