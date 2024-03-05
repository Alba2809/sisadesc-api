import { pool } from "../db.js";

export class EventsModel {
  static async getEventById(id) {
    const [event] = await pool.query(
      "SELECT * FROM events_schedule WHERE id = ?",
      [id]
    );

    return event[0];
  }

  static async getEventByDate(date) {
    const [event] = await pool.query(
      "SELECT * FROM events_schedule WHERE date = ?",
      [date]
    );

    return event[0];
  }

  static async getEvents() {
    const [events] = await pool.query("SELECT * FROM events_schedule");

    return events;
  }

  static async create(data) {
    const [result] = await pool.query(
      "INSERT INTO events_schedule (date, description) VALUES (?,?)",
      [data.date, data.description]
    );

    return result;
  }

  static async update(id, data) {
    const [result] = await pool.query(
      "UPDATE events_schedule SET description =? WHERE id =?",
      [data.description, id]
    );

    return result;
  }

  static async delete(id) {
    const [result] = await pool.query(
      "DELETE FROM events_schedule WHERE id =?",
      [id]
    );

    return result;
  }
}
