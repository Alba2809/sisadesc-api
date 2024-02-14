import { pool } from "../db.js";

export class ParentModel {
  static async getAll() {
    const [parents] = await pool.query(
      "SELECT parents.*, DATE_FORMAT(parents.createdAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedCreatedAt, DATE_FORMAT(parents.updatedAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedUpdatedAt, addresses.CP AS address_cp, addresses.asentamiento AS address_settlement, addresses.tipo_asentamiento AS address_type, addresses.municipio AS address_town, addresses.estado AS address_state, addresses.ciudad AS address_city FROM parents JOIN addresses ON parents.address_id = addresses.id"
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
        type: value.type,
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
        type: value.type,
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

    return parentsWithDetails[0];
  }

  static async create(input) {
    let allInserts = [];

    if (input.father_firstname) {
      const rowFather = await pool.query(
        "INSERT INTO parents (firstname, lastnamepaternal, lastnamematernal, curp, email, rfc, phonenumber, address_id, birthdate, gender, status, street, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
          "Padre/Madre",
        ]
      );

      if (rowFather.affectedRows > 0) allInserts.push(rowFather.insertId);
    }
    if (input.mother_firstname) {
      const rowMother = await pool.query(
        "INSERT INTO parents (firstname, lastnamepaternal, lastnamematernal, curp, email, rfc, phonenumber, address_id, birthdate, gender, status, street, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
          "Padre/Madre",
        ]
      );

      if (rowMother.affectedRows > 0) allInserts.push(rowMother.insertId);
    }
    if (input.tutor_firstname) {
      const rowTutor = await pool.query(
        "INSERT INTO parents (firstname, lastnamepaternal, lastnamematernal, curp, email, rfc, phonenumber, address_id, birthdate, gender, status, street, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
          "Tutor",
        ]
      );

      if (rowTutor.affectedRows > 0) allInserts.push(rowTutor.insertId);
    }

    return allInserts;
  }

  static async update(id, input) {
    const result = await pool.query(
      "UPDATE parents SET firstname = ?, lastnamepaternal = ?, lastnamematernal = ?, curp = ?, email = ?, rfc = ?, phonenumber = ?, address_id = ?, birthdate = ?, gender = ?, status = ?, type = ?, street = ? WHERE id = ?",
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
        input.type,
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
}
