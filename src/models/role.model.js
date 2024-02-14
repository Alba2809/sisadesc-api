import { pool } from "../db.js";

export class RoleModel {
  static async getAll() {
    const [roles] = await pool.query("SELECT * FROM roles");

    return roles
  }

  static async getById(id) {
     const [foundRol] = await pool.query("SELECT * FROM roles WHERE id = ?", [
        id,
      ]);

    return foundRol[0];
  }

}
