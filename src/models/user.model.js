import { pool } from "../db.js";
import bcrypt from "bcryptjs";

export class UserModel {
  static async getAll() {
    const [users] = await pool.query(
      "SELECT users.*, DATE_FORMAT(users.createdAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedCreatedAt, DATE_FORMAT(users.updatedAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedUpdatedAt, roles.name AS role_name, roles.name_spanish AS role_spanish, addresses.CP AS address_cp, addresses.asentamiento AS address_settlement, addresses.tipo_asentamiento AS address_type, addresses.municipio AS address_town, addresses.estado AS address_state, addresses.ciudad AS address_city from users JOIN roles ON users.role = roles.id LEFT JOIN addresses ON users.address_id = addresses.id"
    );

    const usersWithDetails = users.map((user) => {
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
        status: user.status,
        email: user.email,
        createdAt: user.formattedCreatedAt,
        updatedAt: user.formattedUpdatedAt,
        role: {
          id: user.role,
          name: user.role_name,
          name_spanish: user.role_spanish,
        },
        address: {
          postalcode: user.address_cp,
          street: user.street,
          settlement: user.address_settlement,
          type_settlement: user.address_type,
          town: user.address_town,
          state: user.address_state,
          city: user.address_city,
        },
      };
    });

    return usersWithDetails;
  }
  
  static async getAllTest(id) {
    const [users] = await pool.query(
      "SELECT users.*, DATE_FORMAT(users.createdAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedCreatedAt, DATE_FORMAT(users.updatedAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedUpdatedAt, roles.name AS role_name, addresses.CP AS address_cp, addresses.asentamiento AS address_settlement, addresses.tipo_asentamiento AS address_type, addresses.municipio AS address_town, addresses.estado AS address_state, addresses.ciudad AS address_city from users JOIN roles ON users.role = roles.id LEFT JOIN addresses ON users.address_id = addresses.id WHERE users.id != ?",
      [id]
    );

    const usersWithDetails = users.map((user) => {
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
        address: {
          postalcode: user.address_cp,
          street: user.street,
          settlement: user.address_settlement,
          type_settlement: user.address_type,
          town: user.address_town,
          state: user.address_state,
          city: user.address_city,
        },
      };
    });

    return usersWithDetails;
  }

  static async getById(id) {
    const [userFound] = await pool.query(
      "SELECT users.*, DATE_FORMAT(users.createdAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedCreatedAt, DATE_FORMAT(users.updatedAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedUpdatedAt, roles.name AS role_name, roles.name_spanish AS role_spanish, addresses.CP AS address_cp, addresses.asentamiento AS address_settlement, addresses.tipo_asentamiento AS address_type, addresses.municipio AS address_town, addresses.estado AS address_state, addresses.ciudad AS address_city from users JOIN roles ON users.role = roles.id LEFT JOIN addresses ON users.address_id = addresses.id WHERE users.id = ?",
      [id]
    );

    if (!userFound[0]) return false;

    const usersWithDetails = userFound.map((user) => {
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
        status: user.status,
        email: user.email,
        password: user.password,
        createdAt: user.formattedCreatedAt,
        updatedAt: user.formattedUpdatedAt,
        role: {
          id: user.role,
          name: user.role_name,
          name_spanish: user.role_spanish,
        },
        address: {
          id: user.address_id,
          postalcode: user.address_cp,
          street: user.street,
          settlement: user.address_settlement,
          type_settlement: user.address_type,
          town: user.address_town,
          state: user.address_state,
          city: user.address_city,
        },
      };
    });

    return usersWithDetails[0];
  }

  static async getByIds(ids) {
    const [userFound] = await pool.query(
      "SELECT users.*, DATE_FORMAT(users.createdAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedCreatedAt, DATE_FORMAT(users.updatedAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedUpdatedAt, roles.name AS role_name, addresses.CP AS address_cp, addresses.asentamiento AS address_settlement, addresses.tipo_asentamiento AS address_type, addresses.municipio AS address_town, addresses.estado AS address_state, addresses.ciudad AS address_city from users JOIN roles ON users.role = roles.id LEFT JOIN addresses ON users.address_id = addresses.id WHERE users.id IN (?)",
      [ids]
    );

    if (!userFound[0]) return false;

    const usersWithDetails = userFound.map((user) => {
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
        address: {
          id: user.address_id,
          postalcode: user.address_cp,
          street: user.street,
          settlement: user.address_settlement,
          type_settlement: user.address_type,
          town: user.address_town,
          state: user.address_state,
          city: user.address_city,
        },
      };
    });

    return usersWithDetails[0];
  }

  static async getByEmail(email) {
    const [userFound] = await pool.query(
      "SELECT users.*, DATE_FORMAT(users.createdAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedCreatedAt, DATE_FORMAT(users.updatedAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedUpdatedAt, roles.name AS role_name, roles.name_spanish AS role_spanish, addresses.CP AS address_cp, addresses.asentamiento AS address_settlement, addresses.tipo_asentamiento AS address_type, addresses.municipio AS address_town, addresses.estado AS address_state, addresses.ciudad AS address_city from users JOIN roles ON users.role = roles.id LEFT JOIN addresses ON users.address_id = addresses.id WHERE users.email = ?",
      [email]
    );

    const usersWithDetails = userFound.map((user) => {
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
        status: user.status,
        password: user.password,
        email: user.email,
        createdAt: user.formattedCreatedAt,
        updatedAt: user.formattedUpdatedAt,
        role: {
          id: user.role,
          name: user.role_name,
          name_spanish: user.role_spanish,
        },
        address: {
          postalcode: user.address_cp,
          street: user.street,
          settlement: user.address_settlement,
          type_settlement: user.address_type,
          town: user.address_town,
          state: user.address_state,
          city: user.address_city,
        },
      };
    });


    return usersWithDetails[0];
  }

  static async getByCurp(curp) {
    const [userFound] = await pool.query(
      "SELECT users.*, DATE_FORMAT(users.createdAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedCreatedAt, DATE_FORMAT(users.updatedAt, '%Y-%m-%dT%H:%i:%s.000%z') AS formattedUpdatedAt, roles.name AS role_name, roles.name_spanish AS role_spanish, addresses.CP AS address_cp, addresses.asentamiento AS address_settlement, addresses.tipo_asentamiento AS address_type, addresses.municipio AS address_town, addresses.estado AS address_state, addresses.ciudad AS address_city from users JOIN roles ON users.role = roles.id LEFT JOIN addresses ON users.address_id = addresses.id WHERE users.curp = ?",
      [curp]
    );

    const usersWithDetails = userFound.map((user) => {
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
        status: user.status,
        password: user.password,
        email: user.email,
        createdAt: user.formattedCreatedAt,
        updatedAt: user.formattedUpdatedAt,
        role: {
          id: user.role,
          name: user.role_name,
          name_spanish: user.role_spanish,
        },
        address: {
          postalcode: user.address_cp,
          street: user.street,
          settlement: user.address_settlement,
          type_settlement: user.address_type,
          town: user.address_town,
          state: user.address_state,
          city: user.address_city,
        },
      };
    });


    return usersWithDetails[0];
  }

  static async create(input) {
    const {
      firstname,
      lastnamepaternal,
      lastnamematernal,
      curp,
      rfc,
      role,
      email,
      password,
    } = input;

    const passwordHash = await bcrypt.hash(password, 10);

    const rows = await pool.query(
      "INSERT INTO users (firstname, lastnamepaternal, lastnamematernal, curp, rfc, role, email, password, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        firstname,
        lastnamepaternal,
        lastnamematernal,
        curp,
        rfc,
        role,
        email,
        passwordHash,
        "Activo",
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
      status,
      email,
      role,
      imageperfile
    } = input;

    const [result] = await pool.query(
      "UPDATE users SET firstname = ?, lastnamepaternal = ?, lastnamematernal = ?, curp = ?, rfc = ?, address_id = ?, street = ?, phonenumber = ?, birthdate = ?, status = ?, imageperfile = ?, email = ?, role = ? WHERE id = ?",
      [
        firstname,
        lastnamepaternal,
        lastnamematernal,
        curp,
        rfc,
        +addressid,
        street,
        phonenumber,
        birthdate,
        status,
        imageperfile ?? null,
        email,
        +role,
        id,
      ]
    );

    return result;
  }

  static async updatePassword(id, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [
        passwordHash,
        id,
      ]
    );

    return result;
  }

  static async updateImage(id, imageperfile) {
    const [result] = await pool.query(
      "UPDATE users SET imageperfile = ? WHERE id = ?",
      [
        imageperfile,
        id,
      ]
    );

    const user = await this.getById(id);

    return user;
  }

  static async delete(id) {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

    return result;
  }

  static async emailExist(email) {
    const [userFound] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    return userFound[0];
  }

  static async emailExistUpdate(email, id) {
    const [userFound] = await pool.query(
      "SELECT * FROM users WHERE email = ? AND id != ?",
      [email, id]
    );

    const usersWithDetails = userFound.map((user) => {
      return {
        id: user.id,
        firstname: user.firstname,
        lastnamepaternal: user.lastnamepaternal,
        lastnamematernal: user.lastnamematernal,
        curp: user.curp,
        rfc: user.rfc,
        phonenumber: user.phonenumber,
        birthdate: user.birthdate,
        status: user.status,
        imageperfile: user.imageperfile,
        email: user.email,
        role: user.role,
        addressid: user.address_id,
        street: user.street,
        createdAt: user.formattedCreatedAt,
        updatedAt: user.formattedUpdatedAt,
      };
    });

    return usersWithDetails[0];
  }

  static async getCounselorConversations(id){
    const [users] = await pool.query(
      "SELECT DISTINCT * FROM users WHERE curp IN (SELECT tutor_curp FROM students WHERE grade IN(SELECT grade FROM counselors WHERE user_id = ?) AND students.group IN(SELECT counselors.group FROM counselors WHERE user_id = ?) AND tutor_curp IS NOT NULL) AND status = 'Activo'",
      [id,id]
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
