const db = require("../db/connect");

class User {
  constructor({ student_id, firstName, lastName, student_login, password }) {
    (this.student_id = student_id),
      (this.firstName = firstName),
      (this.lastName = lastName),
      (this.student_login = student_login),
      (this.password = password);
  }

  static async getAllStudents() {
    const response = await db.query("SELECT * FROM students;");
    if (response.rows.length === 0) {
      throw new Error("No students found!");
    }
    // return response.rows[0]; // Return the raw rows instead of mapping
    return response.rows;
  }

  static async getOneById(id) {
    const response = await db.query(
      "SELECT * FROM students WHERE student_id = $1;",
      [id]
    );
    if (response.rows.length != 1) {
      throw new Error("Student does not exist!");
    }
    return new User(response.rows[0]);
  }

  static async getOneByStudentLogin(student_login) {
    const response = await db.query(
      "SELECT * FROM students WHERE student_login = $1;",
      [student_login]
    );
    if (response.rows.length != 1) {
      throw new Error("Student does not exist!");
    }
    return new User(response.rows[0]);
  }

  static async create(data) {
    const { firstName, lastName, student_login, password } = data;
    const response = await db.query(
      "INSERT INTO students (firstName, lastName, student_login, password) VALUES ($1, $2, $3, $4) RETURNING *;",
      [firstName, lastName, student_login, password]
    );
    return new User(response.rows[0]);
  }
}

module.exports = User;
