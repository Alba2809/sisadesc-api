import { pool } from "../db.js";

export class GradeModel {
  static async getGradesOfStudents(students_id, subject_id) {
    const [gradesStudents] = await pool.query(
      "SELECT subject_students.student_id, grades.grade, grades.assist_total, grades.evaluation_number FROM grades LEFT JOIN subject_students ON grades.sub_stud_id = subject_students.id WHERE subject_students.student_id IN (?) AND subject_students.subject_id = ? ORDER BY grades.evaluation_number",
      [students_id, subject_id]
    );

    return gradesStudents;
  }

  static async create(student, evaluation_number) {
    const [grade] = await pool.query(
      "INSERT INTO grades (sub_stud_id, grade, assist_total, evaluation_number) VALUES (?,?,?,?)",
      [student.sub_stud_id, student.grade, student.assist, evaluation_number]
    );

    return grade;
  }

  static async existGrades(subject_id, evaluation_number) {
    const [grades] = await pool.query(
      "SELECT * FROM grades JOIN subject_students ON grades.sub_stud_id = subject_students.id WHERE subject_students.subject_id = ? AND grades.evaluation_number = ?",
      [subject_id, evaluation_number]
    );

    return grades;
  }

  static async update(data) {
    const [result] = await pool.query(
      "UPDATE grades SET grade =? WHERE id =?",
      [data.grade, data.id]
    );

    return result;
  }

  static async delete(id) {
    const [result] = await pool.query("DELETE FROM grades WHERE id =?", [id]);

    return result;
  }
}
