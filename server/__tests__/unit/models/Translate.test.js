const db = require("../../../db/connect");
const Translate = require("../../../models/Translate");

describe("Translate Model", () => {
    beforeEach(() => jest.clearAllMocks());
    afterAll(() => jest.resetAllMocks());

    describe("getQuestions", () => {
        it("should return an array of questions when valid level is provided", async () => {
            // Arrange
            const mockQuestions = [
                { question: "¿Cómo estás?", english: "How are you?", fool_1: "Where are you?", fool_2: "What is your name?", fool_3: "What time is it?" },
                { question: "Hola", english: "Hello", fool_1: "Goodbye", fool_2: "Thank you", fool_3: "See you later" },
            ];
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockQuestions });

            // Act
            const result = await Translate.getQuestions("easy");

            // Assert
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
            expect(result[0]).toBeInstanceOf(Translate);
            expect(result[0]).toHaveProperty("question", "¿Cómo estás?");
            expect(result[0]).toHaveProperty("english", "How are you?");
            expect(db.query).toHaveBeenCalledWith(
                "SELECT * FROM spanish_translate WHERE level = $1 ORDER BY RANDOM() LIMIT 10;;",
                ["easy"]
            );
        });

        it("should throw an Error when no questions are found for the given level", async () => {
            // Arrange
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

            // Act & Assert
            await expect(Translate.getQuestions("hard")).rejects.toThrow("No questions found for level: hard");
        });
    });
});
