const db = require("../../../db/connect");
const Translate = require("../../../models/Translate");

describe("Translate", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  describe("getQuestions", () => {
    it("resolves with questions on successful db query", async () => {
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
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockQuestions });

      // Act
      const questions = await Translate.getQuestions(1);

      // Assert
      expect(questions).toHaveLength(2);
      expect(questions[0]).toBeInstanceOf(Translate);
      expect(questions[0]).toHaveProperty("question", "¿Cómo estás?");
      expect(questions[0]).toHaveProperty("english", "How are you?");
      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM spanish_translate WHERE level = $1 ORDER BY RANDOM() LIMIT 10;",
        [1]
      );
    });

    it("should throw an Error when no questions are found", async () => {
      // Arrange
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      // Act & Assert
      await expect(Translate.getQuestions(10)).rejects.toThrow("No questions found for level: 10");
    });
  });
});
