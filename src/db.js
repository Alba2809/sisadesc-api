import { createPool } from "mysql2/promise";
import {
  HOST_MYSQL,
  USER_MYSQL,
  PASSWORD_MYSQL,
  PORT_MYSQL,
  DATABASE_MYSQL,
} from "./config.js";

export const pool = createPool({
  host: HOST_MYSQL,
  user: USER_MYSQL,
  password: PASSWORD_MYSQL,
  port: PORT_MYSQL,
  database: DATABASE_MYSQL,
});

export const connectDB = async () => {
  try {
    await pool.query("select 1 + 1 as result");
    console.log("DB mysql is connected whith the name: "+ DATABASE_MYSQL);
  } catch (error) {
    console.log(error);
  }
};
