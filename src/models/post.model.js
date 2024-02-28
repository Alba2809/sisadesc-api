import { pool } from "../db.js";

export class PostModel {
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM posts ORDER BY createdAt DESC");

    return rows;
  }

  static async getById(id) {
    const [row] = await pool.query("SELECT * FROM posts WHERE id = ?", [id]);

    return row[0];
  }

  static async getByTitle(title) {
    const [row] = await pool.query("SELECT * FROM posts WHERE title = ?", [
      title,
    ]);

    return row[0];
  }

  static async getByTitleForUpdate(title, id) {
    const [row] = await pool.query(
      "SELECT * FROM posts WHERE title = ? AND id!= ?",
      [title, id]
    );

    return row[0];
  }

  static async create(data) {
    const [rows] = await pool.query(
      "INSERT INTO posts (title, description) VALUES (?,?)",
      [data.title, data.description]
    );

    return rows;
  }

  static async update(id, data) {
    const [result] = await pool.query(
      "UPDATE posts SET title =?, description =? WHERE id =?",
      [data.title, data.description, id]
    );

    return result;
  }

  static async delete(id) {
    const [result] = await pool.query("DELETE FROM posts WHERE id =?", [id]);

    return result;
  }
}
