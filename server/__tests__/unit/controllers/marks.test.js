const marksController = require("../../../controllers/marks");
const Marks = require("../../../models/Marks");

// Mock response methods
const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();

const mockStatus = jest.fn(() => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd,
}));

const mockRes = { status: mockStatus };

describe("Marks Controller", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  describe("showLeaderboard", () => {
    it("should return the leaderboard with a status code 200", async () => {
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

    it("should return an error when leaderboard retrieval fails", async () => {
      // Arrange
      jest
        .spyOn(Marks, "getLeaderBoard")
        .mockRejectedValue(new Error("Failed to retrieve leaderboard"));

      // Act
      await marksController.showLeaderboard({}, mockRes);

      // Assert
      expect(Marks.getLeaderBoard).toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Failed to retrieve leaderboard",
      });
    });
  });

  describe("update", () => {
    it("should update marks and return the updated record", async () => {
      // Arrange
      const mockReq = { student_id: 1, body: { score: 10 } };
      const mockMark = {
        student_id: 1,
        total_marks: 85,
        updateMarks: jest
          .fn()
          .mockResolvedValue({ student_id: 1, total_marks: 95 }),
      };
      jest.spyOn(Marks, "getMarkById").mockResolvedValue(mockMark);

      // Act
      await marksController.update(mockReq, mockRes);

      // Assert
      expect(Marks.getMarkById).toHaveBeenCalledWith(1);
      expect(mockMark.updateMarks).toHaveBeenCalledWith(10);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({ student_id: 1, total_marks: 95 });
    });

    it("should return an error when updating marks fails", async () => {
      // Arrange
      const mockReq = { student_id: 1, body: { score: 10 } };
      jest
        .spyOn(Marks, "getMarkById")
        .mockRejectedValue(new Error("Failed to retrieve marks"));

      // Act
      await marksController.update(mockReq, mockRes);

      // Assert
      expect(Marks.getMarkById).toHaveBeenCalledWith(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Failed to retrieve marks",
      });
    });
  });
});
