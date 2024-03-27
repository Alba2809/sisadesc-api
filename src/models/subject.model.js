import { pool } from "../db.js";
import { TeacherModel } from "./teacher.model.js";
import { UserModel } from "./user.model.js";

export class SubjectModel {
  static async getAll() {
    const [subjects] = await pool.query(
      "SELECT subjects.id, subjects.name, subjects.code, subjects.group, subjects.grade, subjects.status, subjects.teacher_id, teachers.curp AS teacher_curp, subjects.counselor_id, users.curp AS counselor_curp, DATE_FORMAT(subjects.createdAt, '%Y-%m-%dT%H:%i:%s.000%z') AS createdAt, DATE_FORMAT(subjects.updatedAt, '%Y-%m-%dT%H:%i:%s.000%z') AS updatedAt, COUNT(DISTINCT subject_students.id) AS students_total FROM subjects LEFT JOIN subject_students ON subjects.id = subject_students.subject_id LEFT JOIN teachers ON subjects.teacher_id = teachers.id LEFT JOIN users ON subjects.counselor_id = users.id GROUP BY subjects.id"
    );

    return subjects;
  }

  static async getSubjects() {
    const [subjects] = await pool.query(
      "SELECT * FROM subjects WHERE status = 'Activo'",
    );

    return subjects;
  }

  static async getById(id) {
    const [foundSubject] = await pool.query(
      "SELECT subjects.id, subjects.name, subjects.code, subjects.group, subjects.teacher_id, teachers.curp AS teacher_curp, subjects.counselor_id, users.curp AS counselor_curp, DATE_FORMAT(subjects.createdAt, '%Y-%m-%dT%H:%i:%s.000%z') AS createdAt, DATE_FORMAT(subjects.updatedAt, '%Y-%m-%dT%H:%i:%s.000%z') AS updatedAt FROM subjects LEFT JOIN teachers ON subjects.teacher_id = teachers.id LEFT JOIN users ON subjects.counselor_id = users.id WHERE subjects.id = ?",
      [id]
    );

    if(!foundSubject[0]) return false

    const [students] = await pool.query(
      "SELECT student_id FROM subject_students WHERE subject_id = ?",
      [id]
    );

    const allData = {
        id: foundSubject[0].id,
        name: foundSubject[0].name,
        code: foundSubject[0].code,
        group: foundSubject[0].group,
        teacher_id: foundSubject[0].teacher_id,
        teacher_curp: foundSubject[0].teacher_curp,
        counselor_id: foundSubject[0].counselor_id,
        counselor_curp: foundSubject[0].counselor_curp,
        createdAt: foundSubject[0].createdAt,
        updatedAt: foundSubject[0].updatedAt,
        students
    }

    return allData;
  }

  static async getSubjectStudents(id) {
    const [students] = await pool.query(
      "SELECT subject_students.*, students.firstname, students.lastnamepaternal, students.lastnamematernal, students.curp FROM subject_students JOIN students ON subject_students.student_id = students.id WHERE subject_id = ?",
      [id]
    );

    return students;
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

  static async getSubjectsOfTeacher(teacher_id) {
    const [subjects] = await pool.query(
      "SELECT * FROM subjects WHERE teacher_id = ? AND status = 'Activo'",
      [teacher_id]
    );

    return subjects;
  }

  static async getSubjectOfStudent(subject_student_id){
    const [rows] = await pool.query(
      "SELECT subject_id FROM subject_students WHERE id = ?",
      [subject_student_id]
    );

    return rows[0];
  }

  static async create(input) {
    let teacher = []
    let counselor = []
    if(input.teacher) teacher = await TeacherModel.getByCurp(input.teacher)
    if(input.counselor) counselor = await UserModel.getByCurp(input.counselor)

    const [rows] = await pool.query(
      "INSERT INTO subjects (name, code, subjects.group, subjects.grade, teacher_id, counselor_id) VALUES (?, ?, ?, ?, ?, ?)",
      [input.name, input.code, input.group, +input.grade, teacher?.id ?? null, counselor?.id ?? null]
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
    let teacher = []
    let counselor = []
    if(input.teacher) teacher = await TeacherModel.getByCurp(input.teacher)
    if(input.counselor) counselor = await UserModel.getByCurp(input.counselor)

    const [result] = await pool.query(
      "UPDATE subjects SET name = ?, code = ?, subjects.group = ?, teacher_id = ?, counselor_id = ? WHERE id = ?",
      [input.name, input.code, input.group, teacher?.id ?? null, counselor?.id ?? null, id]
    );

    return result;
  }

  static async updateStatus(id, status) {
    const [result] = await pool.query(
      "UPDATE subjects SET status = ? WHERE id = ?",
      ["Finalizado", id]
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
