import { pool } from "../db.js";

export class ConversationModel {
  static async getConversation(user_one_id, user_two_id) {
    const [conversation] = await pool.query(
      "SELECT * FROM conversations WHERE participant_one = ? AND participant_two = ? OR participant_one = ? AND participant_two = ?",
      [user_one_id, user_two_id, user_two_id, user_one_id]
    );

    return conversation[0];
  }

  static async create(user_one_id, user_two_id) {
    const [result] = await pool.query(
      "INSERT INTO conversations (participant_one, participant_two) VALUES (?,?)",
      [user_one_id, user_two_id]
    );

    if(result.affectedRows > 0){
      const [conversation] = await pool.query(
        "SELECT * FROM conversations WHERE id =?",
        [result.insertId]
      );

      return conversation[0];
    }
    
    return result;
  }
}
