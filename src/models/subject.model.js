import { pool } from "../db.js";

export class SubjectModel {
  static async getAll() {
    const [subjects] = await pool.query(
      "SELECT subjects.id, subjects.name, subjects.code, subjects.group, subjects.teacher_id, teachers.curp, DATE_FORMAT(subjects.createdAt, '%Y-%m-%dT%H:%i:%s.000%z') AS createdAt, DATE_FORMAT(subjects.updatedAt, '%Y-%m-%dT%H:%i:%s.000%z') AS updatedAt, COUNT(subject_students.id) AS students_total FROM subjects JOIN subject_students on subjects.id = subject_students.subject_id JOIN teachers ON subjects.teacher_id = teachers.id GROUP BY subject_students.subject_id"
    );

    return subjects;
  }

  static async getById(id) {
    const [foundSubject] = await pool.query(
      "SELECT id, name, code, subjects.group, teacher_id, DATE_FORMAT(createdAt, '%Y-%m-%dT%H:%i:%s.000%z') AS createdAt, DATE_FORMAT(updatedAt, '%Y-%m-%dT%H:%i:%s.000%z') AS updatedAt FROM subjects WHERE id = ?",
      [id]
    );

    if(!foundSubject[0]) return false

    const [students] = await pool.query(
      "SELECT * FROM subject_students WHERE subject_id = ?",
      [id]
    );

    const allData = {
        id: foundSubject[0].id,
        name: foundSubject[0].name,
        code: foundSubject[0].code,
        group: foundSubject[0].group,
        teacher_id: foundSubject[0].teacher_id,
        createdAt: foundSubject[0].createdAt,
        updatedAt: foundSubject[0].updatedAt,
        students
    }

    return allData;
  }

  static async getByCode(code) {
    const [foundSubject] = await pool.query(
      "SELECT * FROM subjects WHERE code = ?",
      [code]
    );

    return foundSubject[0];
  }

  static async getByCodeUpdate(id, code) {
    const [foundSubject] = await pool.query(
      "SELECT * FROM subjects WHERE code = ? AND id != ?",
      [code, id]
    );

    return foundSubject[0];
  }

  static async create(input) {
    const [rows] = await pool.query(
      "INSERT INTO subjects (name, code, group, teacher_id) VALUES (?, ?, ?, ?)",
      [input.name, input.code, input.group, input.teacher]
    );

    return rows;
  }

  static async createSubjectStudent(subject_id, student_id) {
    const [rows] = await pool.query(
      "INSERT INTO subject_students (subject_id, student_id) VALUES (?, ?)",
      [subject_id, student_id]
    );

    return rows;
  }

  static async update(id, input) {
    const [result] = await pool.query(
      "UPDATE subjects SET name = ?, code = ?, group = ?, teacher_id = ? WHERE id = ?",
      [input.name, input.code, input.group, input.teacher, id]
    );

    return result;
  }

  static async deleteSubject(id) {
    const [result] = await pool.query("DELETE FROM subjects WHERE id = ?", [
      id,
    ]);

    return result;
  }

  static async deleteSubjectStudent(id) {
    const result = await pool.query(
      "DELETE FROM subject_students WHERE subject_id = ?",
      [id]
    );

    return result;
  }
}
