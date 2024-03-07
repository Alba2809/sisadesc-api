import { pool } from "../db.js";

export class MessageModel {
  static async getMessages(conversation_id) {
    const [messages] = await pool.query(
      "SELECT id, conversation_id, sender_id, receiver_id, message, CASE WHEN fileData IS NOT NULL THEN true ELSE false END AS hasFile, messages.status, createdAt FROM messages WHERE conversation_id = ? ORDER BY createdAt ASC",
      [conversation_id]
    );

    return messages;
  }

  static async getMessageById(id) {
    const [message] = await pool.query("SELECT * FROM messages WHERE id =?", [
      id,
    ]);

    return message[0];
  }

  static async create(conversation_id, sender_id, receiver_id, message, fileData, fileName) {
    const [result] = await pool.query(
      "INSERT INTO messages (conversation_id, sender_id, receiver_id, message, fileData, fileName) VALUES (?,?,?,?,?,?)",
      [conversation_id, sender_id, receiver_id, message ?? null, fileData ?? null, fileName ?? null]
    );

    if (result.affectedRows > 0) {
      const [message] = await pool.query("SELECT id, conversation_id, sender_id, receiver_id, message, CASE WHEN fileData IS NOT NULL THEN true ELSE false END AS hasFile, messages.status, createdAt FROM messages WHERE id =?", [
        result.insertId,
      ]);

      return message[0];
    }

    return result;
  }

  static async getFile(id) {
    const [message] = await pool.query("SELECT fileData, fileName FROM messages WHERE id =?", [id])

    return message[0];
  }
}
