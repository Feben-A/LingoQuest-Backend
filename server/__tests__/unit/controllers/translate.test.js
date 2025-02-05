const translateController = require("../../../controllers/translate");
const Translate = require("../../../models/Translate");

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

describe("Translate Controller", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  describe("show", () => {
    it("should return questions with a status code 200", async () => {
      // Arrange
      const mockQuestions = [
        {
          question: "¿Cómo estás?",
          english: "How are you?",
          fool_1: "Where are you?",
          fool_2: "What time is it?",
          fool_3: "Who are you?",
        },
        {
          question: "¿Dónde vives?",
          english: "Where do you live?",
          fool_1: "Where do you work?",
          fool_2: "What do you like?",
          fool_3: "How old are you?",
        },
      ];
      const mockReq = { params: { level: "1" } };
      jest.spyOn(Translate, "getQuestions").mockResolvedValue(mockQuestions);

      // Act
      await translateController.show(mockReq, mockRes);

      // Assert
      expect(Translate.getQuestions).toHaveBeenCalledWith("1");
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockQuestions);
    });

    it("should return an error when no questions are found", async () => {
      // Arrange
      const mockReq = { params: { level: "99" } };
      jest.spyOn(Translate, "getQuestions").mockRejectedValue(new Error("No questions found for level: 99"));

      // Act
      await translateController.show(mockReq, mockRes);

      // Assert
      expect(Translate.getQuestions).toHaveBeenCalledWith("99");
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: "No questions found for level: 99" });
    });
  });
});
