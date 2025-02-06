const db = require("../../../db/connect");
const Marks = require("../../../models/Marks");

describe("Marks", () => {
    beforeEach(() => jest.clearAllMocks());
    afterAll(() => jest.resetAllMocks());

    describe("getMarkById", () => {
        it("resolves with marks on successful db query", async () => {
            // Arrange
            const mockMarks = { marks_id: 1, student_id: 101, total_marks: 85 };
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [mockMarks] });

            // Act
            const result = await Marks.getMarkById(101);

            // Assert
            expect(result).toBeInstanceOf(Marks);
            expect(result.student_id).toBe(101);
            expect(result.total_marks).toBe(85);
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM marks WHERE student_id = $1;", [101]);
        });

        it("should throw an Error when marks are not found", async () => {
            // Arrange
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

            // Act & Assert
            await expect(Marks.getMarkById(999)).rejects.toThrow();
        });
    });

    describe("getLeaderBoard", () => {
        it("resolves with top 3 students based on total marks", async () => {
            // Arrange
            const mockLeaderboard = [
                { firstName: "Alice", lastName: "Brown", total_marks: 95 },
                { firstName: "Bob", lastName: "Smith", total_marks: 90 },
                { firstName: "Charlie", lastName: "Johnson", total_marks: 85 },
            ];
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockLeaderboard });

            // Act
            const result = await Marks.getLeaderBoard();

            // Assert
            expect(result).toHaveLength(3);
            expect(result[0].firstName).toBe("Alice");
            expect(db.query).toHaveBeenCalledWith(
                "SELECT s.firstName, s.lastName, m.total_marks FROM students AS s JOIN marks AS m ON (s.student_id = m.student_id) ORDER BY total_marks DESC LIMIT 3"
            );
        });
    });

    describe("updateMarks", () => {
        it("updates the marks and returns the updated record", async () => {
            // Arrange
            const mockUpdatedMarks = { marks_id: 1, student_id: 101, total_marks: 95 };
            const markInstance = new Marks({ marks_id: 1, student_id: 101, total_marks: 85 });
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [mockUpdatedMarks] });

            // Act
            const result = await markInstance.updateMarks(10);

            // Assert
            expect(result.total_marks).toBe(95);
            expect(db.query).toHaveBeenCalledWith(
                "UPDATE marks SET total_marks = total_marks + $1 WHERE student_id = $2 RETURNING *;",
                [10, 101]
            );
        });

        it("should throw an Error when update fails", async () => {
            // Arrange
            const markInstance = new Marks({ marks_id: 1, student_id: 101, total_marks: 85 });
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

            // Act & Assert
            await expect(markInstance.updateMarks(10)).rejects.toThrow("Unable to update marks.");
        });
    });
});
