const db = require("../db/connect");

class Marks {
  constructor({ marks_id, student_id, total_marks }) {
    (this.marks_id = marks_id),
      (this.student_id = student_id),
      (this.total_marks = total_marks);
  }

  static async getMarkById(student_id) {
    const response = await db.query(
      "SELECT * FROM marks WHERE student_id = $1;",
      [student_id]
    );

    return new Marks(response.rows[0]);
  }

  static async getLeaderBoard() {
    const response = await db.query(
      "SELECT s.firstName, s.lastName, m.total_marks FROM students AS s JOIN marks AS m ON (s.student_id = m.student_id) ORDER BY total_marks DESC LIMIT 3"
    );

    return response.rows;
  }

  static async updateMarks(marks) {
    const response = await db.query("UPDATE marks SET total_marks");
  }
}

module.exports = Marks;
