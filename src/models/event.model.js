import { pool } from "../db.js";

export class EventsModel {
  static async getEventById(id) {
    const [event] = await pool.query(
      "SELECT * FROM schedule_events WHERE id = ?",
      [id]
    );

    return event[0];
  }

  static async getEventByDate(date) {
    const [event] = await pool.query(
      "SELECT * FROM schedule_events WHERE date = ?",
      [date]
    );

    return event[0];
  }

  static async getEventsByDate(date) {
    const [events] = await pool.query(
      "SELECT * FROM schedule_events WHERE date = ?",
      [date]
    );

    return events;
  }

  static async getEvents() {
    const [events] = await pool.query("SELECT * FROM schedule_events");

    return events;
  }

  static async create(data) {
    const [result] = await pool.query(
      "INSERT INTO schedule_events (date, description, start_time, end_time) VALUES (?,?,?,?)",
      [data.date, data.description, data.start_time, data.end_time]
    );

    return result;
  }

  static async update(id, data) {
    const [result] = await pool.query(
      "UPDATE schedule_events SET description =?, start_time =?, end_time =? WHERE id =?",
      [data.description, data.start_time, data.end_time, id]
    );

    return result;
  }

  static async delete(id) {
    const [result] = await pool.query(
      "DELETE FROM schedule_events WHERE id =?",
      [id]
    );

    return result;
  }
}
