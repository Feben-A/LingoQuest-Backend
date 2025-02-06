const marksController = require("../../../controllers/marks");
const Marks = require("../../../models/Marks");

// Mocking response methods
const mockJson = jest.fn();
const mockEnd = jest.fn();

const mockStatus = jest.fn(() => ({
  json: mockJson,
  end: mockEnd,
}));

const mockRes = { status: mockStatus };

describe("Marks Controller", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  describe("showLeaderboard", () => {
    it("should return the leaderboard with a 200 status code", async () => {
      // Arrange
      const mockLeaderboard = [
        { firstName: "Alice", lastName: "Brown", total_marks: 95 },
        { firstName: "Bob", lastName: "Smith", total_marks: 90 },
        { firstName: "Charlie", lastName: "Johnson", total_marks: 85 },
      ];

      jest.spyOn(Marks, "getLeaderBoard").mockResolvedValue(mockLeaderboard);

      // Act
      await marksController.showLeaderboard({}, mockRes);

      // Assert
      expect(Marks.getLeaderBoard).toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockLeaderboard);
    });

    it("should return a 404 error if the leaderboard cannot be retrieved", async () => {
      // Arrange
      jest.spyOn(Marks, "getLeaderBoard").mockRejectedValue(new Error("Leaderboard not available"));

      // Act
      await marksController.showLeaderboard({}, mockRes);

      // Assert
      expect(Marks.getLeaderBoard).toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: "Leaderboard not available" });
    });
  });

  describe("update", () => {
    it("should update marks and return the updated record with a 200 status code", async () => {
      // Arrange
      const mockUpdatedMarks = { student_id: 101, total_marks: 95 };
      const mockMarkInstance = { updateMarks: jest.fn().mockResolvedValue(mockUpdatedMarks) };

      jest.spyOn(Marks, "getMarkById").mockResolvedValue(mockMarkInstance);

      const mockReq = { student_id: 101, body: { score: 10 } };

      // Act
      await marksController.update(mockReq, mockRes);

      // Assert
      expect(Marks.getMarkById).toHaveBeenCalledWith(101);
      expect(mockMarkInstance.updateMarks).toHaveBeenCalledWith(10);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockUpdatedMarks);
    });

    it("should return a 400 error if the update fails", async () => {
      // Arrange
      jest.spyOn(Marks, "getMarkById").mockRejectedValue(new Error("Update failed"));

      const mockReq = { student_id: 101, body: { score: 10 } };

      // Act
      await marksController.update(mockReq, mockRes);

      // Assert
      expect(Marks.getMarkById).toHaveBeenCalledWith(101);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: "Update failed" });
    });
  });
});
