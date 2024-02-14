import { pool } from "../db.js";

export class AddressModel {
  static async getAll() {
    const [addresses] = await pool.query("SELECT * FROM addresses");

    return addresses;
  }

  static async getById(id) {
    const [foundAddress] = await pool.query(
      "SELECT * FROM addresses WHERE id = ?",
      [id]
    );

    return foundAddress[0];
  }
}
