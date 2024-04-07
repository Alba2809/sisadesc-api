import { pool } from "../db.js";
import { UserModel } from "./user.model.js";

export class CounselorModel {
  static async getAll() {
    const [counselors] = await pool.query(
      "SELECT counselors.*, users.firstname, users.lastnamepaternal, users.lastnamematernal, users.curp, users.rfc FROM counselors LEFT JOIN users ON counselors.user_id = users.id"
    );

    return counselors;
  }

  static async getById(id) {
    const [counselor] = await pool.query(
      "SELECT counselors.*, users.firstname, users.lastnamepaternal, users.lastnamematernal, users.curp, users.rfc FROM counselors LEFT JOIN users ON counselors.user_id = users.id WHERE counselors.id =?",
      [id]
    );

    return counselor;
  }

  static async getByGradeGroup(grade, group) {
    const [counselor] = await pool.query(
      "SELECT * FROM counselors WHERE grade =? AND counselors.group =?",
      [+grade, group]
    );

    return counselor[0];
  }

  static async create(input) {
    let user = null;
    if (input.counselor_curp)
      user = await UserModel.getByCurp(input.counselor_curp);

    if (!user) return null;

    const [result] = await pool.query(
      "INSERT INTO counselors (user_id, grade, counselors.group) VALUES (?,?,?)",
      [user.id, +input.grade, input.group]
    );

    return result;
  }

  static async update(id, input) {
    let user = null;
    if (input.counselor_curp)
      user = await UserModel.getByCurp(input.counselor_curp);

    if (user) return null;

    const [result] = await pool.query(
      "UPDATE counselors SET user_id =?, grade =?, counselors.group =? WHERE id =?",
      [input.user_id, input.grade, input.group, id]
    );

    return result;
  }

  static async delete(id) {
    const [result] = await pool.query("DELETE FROM counselors WHERE id =?", [
      id,
    ]);

    return result;
  }
}
