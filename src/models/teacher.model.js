import { pool } from "../db.js";

export class TeacherModel {
  static async getAll() {
    const [teachers] = await pool.query(
      "SELECT teachers.*, DATE_FORMAT(teachers.createdAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedCreatedAt, DATE_FORMAT(teachers.updatedAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedUpdatedAt, addresses.CP AS address_cp, addresses.asentamiento AS address_settlement, addresses.tipo_asentamiento AS address_type, addresses.municipio AS address_town, addresses.estado AS address_state, addresses.ciudad AS address_city from teachers JOIN addresses ON teachers.address_id = addresses.id"
    );

    const teachersWithDetails = teachers.map((value) => {
      return {
        id: value.id,
        firstname: value.firstname,
        lastnamepaternal: value.lastnamepaternal,
        lastnamematernal: value.lastnamematernal,
        curp: value.curp,
        rfc: value.rfc,
        phonenumber: value.phonenumber,
        birthdate: value.birthdate,
        gender: value.gender,
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

    return teachersWithDetails;
  }

  static async getById(id) {
    const [foundTeacher] = await pool.query(
      "SELECT teachers.*, DATE_FORMAT(teachers.createdAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedCreatedAt, DATE_FORMAT(teachers.updatedAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedUpdatedAt, addresses.CP AS address_cp, addresses.asentamiento AS address_settlement, addresses.tipo_asentamiento AS address_type, addresses.municipio AS address_town, addresses.estado AS address_state, addresses.ciudad AS address_city from teachers JOIN addresses ON teachers.address_id = addresses.id WHERE teachers.id = ?",
      [id]
    );

    if (!foundTeacher[0]) return null;

    const teachersWithDetails = foundTeacher.map((value) => {
      return {
        id: value.id,
        firstname: value.firstname,
        lastnamepaternal: value.lastnamepaternal,
        lastnamematernal: value.lastnamematernal,
        curp: value.curp,
        rfc: value.rfc,
        phonenumber: value.phonenumber,
        birthdate: value.birthdate,
        gender: value.gender,
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

    return teachersWithDetails[0];
  }

  static async create(input) {
    const {
      firstname,
      lastnamepaternal,
      lastnamematernal,
      curp,
      rfc,
      addressid,
      street,
      phonenumber,
      birthdate,
      gender,
    } = input;

    const [rows] = await pool.query(
      "INSERT INTO teachers (firstname, lastnamepaternal, lastnamematernal, curp, rfc, address_id, street, phonenumber, birthdate, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        firstname,
        lastnamepaternal,
        lastnamematernal,
        curp,
        rfc,
        addressid,
        street,
        phonenumber,
        birthdate,
        gender,
      ]
    );

    return rows;
  }

  static async update(id, input) {
    const {
      firstname,
      lastnamepaternal,
      lastnamematernal,
      curp,
      rfc,
      addressid,
      street,
      phonenumber,
      birthdate,
      gender,
    } = input;

    const [result] = await pool.query(
      "UPDATE teachers SET firstname = ?, lastnamepaternal = ?, lastnamematernal = ?, curp = ?, rfc = ?, address_id = ?, street = ?, phonenumber = ?, birthdate = ?, gender = ? WHERE id = ?",
      [
        firstname,
        lastnamepaternal,
        lastnamematernal,
        curp,
        rfc,
        addressid,
        street,
        phonenumber,
        birthdate,
        gender,
        id,
      ]
    );

    return result;
  }

  static async delete(id) {
    const [result] = await pool.query("DELETE FROM teachers WHERE id = ?", [id]);

    return result;
  }
}
