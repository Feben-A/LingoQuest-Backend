const db = require("../db/connect");

class Translate {
  constructor({ question, english, fool_1, fool_2, fool_3 }) {
    (this.question = question),
      (this.english = english),
      (this.fool_1 = fool_1),
      (this.fool_2 = fool_2),
      (this.fool_3 = fool_3);
  }

  static async getQuestions(level) {
    const response = await db.query(
      "SELECT * FROM spanish_translate WHERE level = $1 ORDER BY RANDOM() LIMIT 10;",
      [level]
    );
    if (response.rows.length === 0) {
      throw new Error(`No questions found for level: ${level}`);
    }

    return response.rows.map((q) => new Translate(q));
  }
}

module.exports = Translate;
