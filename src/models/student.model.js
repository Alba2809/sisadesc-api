import { pool } from "../db.js";

export class StudentModel {
  static async getAll() {
    const [students] = await pool.query(
      "SELECT students.*, DATE_FORMAT(students.createdAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedCreatedAt, DATE_FORMAT(students.updatedAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedUpdatedAt, addresses.CP AS address_cp, addresses.asentamiento AS address_settlement, addresses.tipo_asentamiento AS address_type, addresses.municipio AS address_town, addresses.estado AS address_state, addresses.ciudad AS address_city from students JOIN addresses ON students.address_id = addresses.id"
    );

    const studentsWithDetails = students.map((value) => {
      return {
        id: value.id,
        firstname: value.firstname,
        lastnamepaternal: value.lastnamepaternal,
        lastnamematernal: value.lastnamematernal,
        curp: value.curp,
        phonenumber: value.phonenumber,
        birthdate: value.birthdate,
        gender: value.gender,
        group: value.group,
        grade: value.grade,
        email: value.email,
        father_curp: value.father_curp,
        mother_curp: value.mother_curp,
        tutor_curp: value.tutor_curp,
        createdAt: value.formattedCreatedAt,
        updatedAt: value.formattedUpdatedAt,
        address: {
          postalcode: value.address_cp,
          street: value.street,
          settlement: value.address_settlement,
          type_settlement: value.address_type,
          town: value.address_town,
          state: value.address_state,
          city: value.address_city,
        },
      };
    });

    return studentsWithDetails;
  }

  static async getById(id) {
    const [foundStudent] = await pool.query(
      "SELECT students.*, DATE_FORMAT(students.createdAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedCreatedAt, DATE_FORMAT(students.updatedAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedUpdatedAt, addresses.CP AS address_cp, addresses.asentamiento AS address_settlement, addresses.tipo_asentamiento AS address_type, addresses.municipio AS address_town, addresses.estado AS address_state, addresses.ciudad AS address_city from students JOIN addresses ON students.address_id = addresses.id WHERE students.id = ?",
      [id]
    );

    const studentsWithDetails = foundStudent.map((value) => {
      return {
        id: value.id,
        firstname: value.firstname,
        lastnamepaternal: value.lastnamepaternal,
        lastnamematernal: value.lastnamematernal,
        curp: value.curp,
        phonenumber: value.phonenumber,
        birthdate: value.birthdate,
        gender: value.gender,
        group: value.group,
        grade: value.grade,
        email: value.email,
        father_curp: value.father_curp,
        mother_curp: value.mother_curp,
        tutor_curp: value.tutor_curp,
        createdAt: value.formattedCreatedAt,
        updatedAt: value.formattedUpdatedAt,
        address: {
          id: value.address_id,
          postalcode: value.address_cp,
          street: value.street,
          settlement: value.address_settlement,
          type_settlement: value.address_type,
          town: value.address_town,
          state: value.address_state,
          city: value.address_city,
        },
      };
    });

    return studentsWithDetails[0];
  }

  static async getStudentsById(ids) {
    const [foundStudents] = await pool.query(
      "SELECT * from students WHERE id IN (?)",
      [ids]
    );

    return foundStudents;
  }

  static async create(input) {
    const tutorCurp =
      input.tutor_curp === "" || !input.tutor_curp
        ? input.isTutor === "Madre"
          ? input.mother_curp
          : input.isTutor === "Padre"
          ? input.father_curp
          : null
        : input.tutor_curp;
    const rows = await pool.query(
      "INSERT INTO students (firstname, lastnamepaternal, lastnamematernal, curp, gender, birthdate, address_id, street, email, students.group, students.grade, phonenumber, father_curp, mother_curp, tutor_curp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        input.student_firstname,
        input.student_lastnamepaternal,
        input.student_lastnamematernal,
        input.student_curp,
        input.student_gender,
        input.student_birthdate,
        input.student_addressid,
        input.student_street,
        input.student_email,
        input.student_group,
        +input.student_grade,
        input.student_phonenumber,
        input.father_curp === "" ? null : input.father_curp,
        input.mother_curp === "" ? null : input.mother_curp,
        tutorCurp,
      ]
    );

    return rows;
  }

  static async update(id, input) {
    const [result] = await pool.query(
      "UPDATE students SET firstname = ?, lastnamepaternal = ?, lastnamematernal = ?, curp = ?, gender = ?, birthdate = ?, address_id = ?, street = ?, email = ?, students.group = ?, students.grade = ?, phonenumber = ?, father_curp = ?, mother_curp = ?, tutor_curp = ? WHERE id = ?",
      [
        input.student_firstname,
        input.student_lastnamepaternal,
        input.student_lastnamematernal,
        input.student_curp,
        input.student_gender,
        input.student_birthdate,
        input.student_addressid,
        input.student_street,
        input.student_email,
        input.student_group,
        input.student_grade,
        input.student_phonenumber,
        input.father_curp === "" ? null : input.father_curp,
        input.mother_curp === "" ? null : input.mother_curp,
        input.tutor_curp === "" ? null : input.tutor_curp,
        id,
      ]
    );

    return result;
  }

  static async delete(id) {
    const result = await pool.query("DELETE FROM students WHERE id = ?", [id]);

    return result;
  }
}
