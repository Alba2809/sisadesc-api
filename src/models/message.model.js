import { pool } from "../db.js";

export class MessageModel {
  static async getMessages(conversation_id) {
    const [messages] = await pool.query(
      "SELECT * FROM messages WHERE conversation_id = ? ORDER BY createdAt ASC",
      [conversation_id]
    );

    return messages;
  }

  static async create(conversation_id, sender_id, receiver_id, message) {
    const [result] = await pool.query(
      "INSERT INTO messages (conversation_id, sender_id, receiver_id, message) VALUES (?,?,?,?)",
      [conversation_id, sender_id, receiver_id, message]
    );

    if (result.affectedRows > 0) {
      const [message] = await pool.query("SELECT * FROM messages WHERE id =?", [
        result.insertId,
      ]);
      
      return message[0];
    }

    return result;
  }
}
