import { pool } from "../db.js";

export class ParentModel {
  static async getAll() {
    const [parents] = await pool.query(
      "SELECT COUNT(DISTINCT students.id) AS total_students, parents.*, DATE_FORMAT(parents.createdAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedCreatedAt, DATE_FORMAT(parents.updatedAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedUpdatedAt, addresses.CP AS address_cp, addresses.asentamiento AS address_settlement, addresses.tipo_asentamiento AS address_type, addresses.municipio AS address_town, addresses.estado AS address_state, addresses.ciudad AS address_city FROM parents LEFT JOIN students ON students.father_curp = parents.curp OR students.mother_curp = parents.curp OR students.tutor_curp = parents.curp JOIN addresses ON parents.address_id = addresses.id GROUP BY parents.id"
    );

    const parentsWithDetails = parents.map((value) => {
      return {
        id: value.id,
        firstname: value.firstname,
        lastnamepaternal: value.lastnamepaternal,
        lastnamematernal: value.lastnamematernal,
        curp: value.curp,
        email: value.email,
        rfc: value.rfc,
        phonenumber: value.phonenumber,
        birthdate: value.birthdate,
        gender: value.gender,
        status: value.status,
        total_students: value.total_students,
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

    return parentsWithDetails;
  }

  static async getById(id) {
    const [foundParent] = await pool.query(
      "SELECT parents.*, DATE_FORMAT(parents.createdAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedCreatedAt, DATE_FORMAT(parents.updatedAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedUpdatedAt, addresses.CP AS address_cp, addresses.asentamiento AS address_settlement, addresses.tipo_asentamiento AS address_type, addresses.municipio AS address_town, addresses.estado AS address_state, addresses.ciudad AS address_city FROM parents JOIN addresses ON parents.address_id = addresses.id WHERE parents.id = ?",
      [id]
    );

    const parentsWithDetails = foundParent.map((value) => {
      return {
        id: value.id,
        firstname: value.firstname,
        lastnamepaternal: value.lastnamepaternal,
        lastnamematernal: value.lastnamematernal,
        curp: value.curp,
        email: value.email,
        rfc: value.rfc,
        phonenumber: value.phonenumber,
        birthdate: value.birthdate,
        gender: value.gender,
        status: value.status,
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

    return parentsWithDetails[0];
  }

  static async create(input) {
    let allInserts = [];

    if (input.father_firstname) {
      const rowFather = await pool.query(
        "INSERT INTO parents (firstname, lastnamepaternal, lastnamematernal, curp, email, rfc, phonenumber, address_id, birthdate, gender, status, street) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          input.father_firstname,
          input.father_lastnamepaternal,
          input.father_lastnamematernal,
          input.father_curp,
          input.father_email,
          input.father_rfc,
          input.father_phonenumber,
          input.father_addressid,
          input.father_birthdate,
          input.father_gender,
          input.father_status,
          input.father_street,
        ]
      );

      if (rowFather[0].affectedRows > 0) allInserts.push(rowFather[0].insertId);
    } else if (input.mother_firstname) {
      const rowMother = await pool.query(
        "INSERT INTO parents (firstname, lastnamepaternal, lastnamematernal, curp, email, rfc, phonenumber, address_id, birthdate, gender, status, street) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          input.mother_firstname,
          input.mother_lastnamepaternal,
          input.mother_lastnamematernal,
          input.mother_curp,
          input.mother_email,
          input.mother_rfc,
          input.mother_phonenumber,
          input.mother_addressid,
          input.mother_birthdate,
          input.mother_gender,
          input.mother_status,
          input.mother_street,
        ]
      );

      if (rowMother[0].affectedRows > 0) allInserts.push(rowMother[0].insertId);
    } else if (input.tutor_firstname) {
      const rowTutor = await pool.query(
        "INSERT INTO parents (firstname, lastnamepaternal, lastnamematernal, curp, email, rfc, phonenumber, address_id, birthdate, gender, status, street) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          input.tutor_firstname,
          input.tutor_lastnamepaternal,
          input.tutor_lastnamematernal,
          input.tutor_curp,
          input.tutor_email,
          input.tutor_rfc,
          input.tutor_phonenumber,
          input.tutor_addressid,
          input.tutor_birthdate,
          input.tutor_gender,
          input.tutor_status,
          input.tutor_street,
        ]
      );

      if (rowTutor[0].affectedRows > 0) allInserts.push(rowTutor[0].insertId);
    }

    return allInserts;
  }

  static async createParent(input){
    const row = await pool.query(
      "INSERT INTO parents (firstname, lastnamepaternal, lastnamematernal, curp, email, rfc, phonenumber, address_id, birthdate, gender, status, street) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        input.firstname,
        input.lastnamepaternal,
        input.lastnamematernal,
        input.curp,
        input.email,
        input.rfc,
        input.phonenumber,
        input.addressid,
        input.birthdate,
        input.gender,
        input.status,
        input.street,
      ]
    );

    return row;
  }

  static async update(id, input) {
    const result = await pool.query(
      "UPDATE parents SET firstname = ?, lastnamepaternal = ?, lastnamematernal = ?, curp = ?, email = ?, rfc = ?, phonenumber = ?, address_id = ?, birthdate = ?, gender = ?, status = ?, street = ? WHERE id = ?",
      [
        input.firstname,
        input.lastnamepaternal,
        input.lastnamematernal,
        input.curp,
        input.email,
        input.rfc,
        input.phonenumber,
        input.addressid,
        input.birthdate,
        input.gender,
        input.status,
        input.street,
        id,
      ]
    );

    return result;
  }

  static async delete(id) {
    const [result] = await pool.query("DELETE FROM parents WHERE id = ?", [id]);

    return result;
  }

  static async curpExist(curp) {
    const [result] = await pool.query("Select * FROM parents WHERE curp = ?", [
      curp,
    ]);

    return result[0];
  }

  static async curpExistUpdate(curp, id) {
    const [result] = await pool.query(
      "Select * FROM parents WHERE curp = ? AND id != ?",
      [curp, id]
    );

    return result[0];
  }

  static async emailExist(email) {
    const [result] = await pool.query("Select * FROM parents WHERE email = ?", [
      email,
    ]);

    return result[0];
  }

  static async emailExistUpdate(email, id) {
    const [result] = await pool.query(
      "Select * FROM parents WHERE email = ? AND id != ?",
      [email, id]
    );

    return result[0];
  }

  static async getUsersToChat(curp){
    const [users] = await pool.query(
      "SELECT DISTINCT * FROM users WHERE id IN (SELECT DISTINCT user_id FROM counselors WHERE grade IN(SELECT grade FROM students WHERE tutor_curp = ?) AND counselors.group IN(SELECT students.group FROM students WHERE tutor_curp = ?)) AND status = 'Activo'",
      [curp, curp]
    );

    const usersMapped = users.map((user) => {
      return {
        id: user.id,
        firstname: user.firstname,
        lastnamepaternal: user.lastnamepaternal,
        lastnamematernal: user.lastnamematernal,
        curp: user.curp,
        rfc: user.rfc,
        phonenumber: user.phonenumber,
        birthdate: user.birthdate,
        imageperfile: user.imageperfile,
      };
    });

    return usersMapped;
  }
}
