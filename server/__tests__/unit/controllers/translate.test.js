const translateController = require("../../../controllers/translate");
const Translate = require("../../../models/Translate");

// Mocking response methods
const mockJson = jest.fn();
const mockEnd = jest.fn();

const mockStatus = jest.fn(() => ({
  json: mockJson,
  end: mockEnd,
}));

const mockRes = { status: mockStatus };

describe("Translate Controller", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  describe("show", () => {
    it("should return a list of translation questions with a 200 status code", async () => {
      // Arrange
      const mockQuestions = [
        { question: "¿Cómo estás?", english: "How are you?", fool_1: "Where are you?", fool_2: "What is your name?", fool_3: "What time is it?" },
        { question: "Hola", english: "Hello", fool_1: "Goodbye", fool_2: "Thank you", fool_3: "See you later" },
      ];

      const mockReq = { params: { level: "easy" } };
      jest.spyOn(Translate, "getQuestions").mockResolvedValue(mockQuestions);

      // Act
      await translateController.show(mockReq, mockRes);

      // Assert
      expect(Translate.getQuestions).toHaveBeenCalledWith("easy");
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockQuestions);
    });

    it("should return a 404 error if no questions are found", async () => {
      // Arrange
      const mockReq = { params: { level: "hard" } };
      jest.spyOn(Translate, "getQuestions").mockRejectedValue(new Error("No questions found"));

      // Act
      await translateController.show(mockReq, mockRes);

      // Assert
      expect(Translate.getQuestions).toHaveBeenCalledWith("hard");
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: "No questions found" });
    });
  });
});
