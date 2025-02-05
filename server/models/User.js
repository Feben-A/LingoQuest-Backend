const db = require("../db/connect");

class User {
  constructor({ student_id, firstName, lastName, student_login, password }) {
    (this.student_id = student_id),
      (this.firstName = firstName),
      (this.lastName = lastName),
      (this.student_login = student_login),
      (this.password = password);
  }

  static async marks(student_id) {
    const response = await db.query(
      "INSERT INTO marks (student_id, total_marks) VALUES ($1, $2) RETURNING *;",
      [student_id, 0]
    );
    return response.rows[0];
  }

  static async create(data) {
    const { firstName, lastName, student_login, password } = data;

    const response = await db.query(
      "INSERT INTO students (firstName, lastName, student_login, password) VALUES ($1, $2, $3, $4) RETURNING *;",
      [firstName, lastName, student_login, password]
    );

    const studentId = response.rows[0].student_id;

    await this.marks(studentId);

    return new User(response.rows[0]);
  }
}

module.exports = User;
