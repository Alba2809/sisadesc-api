import { pool } from "../db.js";

export class AssistModel {
  static async getAssistsOfStudents(students_id, subject_id) {
    const [assistsStudents] = await pool.query(
      "SELECT subject_students.student_id, DATE_FORMAT(assists.date, '%Y-%m-%dT%H:%i:%s.000%z') AS date, assists.assist FROM assists LEFT JOIN subject_students ON assists.sub_stud_id = subject_students.id WHERE subject_students.student_id IN (?) AND subject_students.subject_id = ? ORDER BY assists.date",
      [students_id, subject_id]
    );

    return assistsStudents;
  }

  static async create(student, date) {
    const [assist] = await pool.query(
      "INSERT INTO assists (sub_stud_id, assists.date, assist) VALUES (?,?,?)",
      [student.sub_stud_id, date, student.assist ?? null]
    );

    return assist;
  }

  static async existAssists(subject_id, date) {
    const [assist] = await pool.query(
      "SELECT * FROM assists JOIN subject_students ON assists.sub_stud_id = subject_students.id WHERE subject_students.subject_id = ? AND assists.date = ?",
      [subject_id, date]
    );

    return assist;
  }

  static async update(data) {
    const [assist] = await pool.query(
      "UPDATE assists SET date =? WHERE id =?",
      [data.date, data.id]
    );

    return assist;
  }
}
