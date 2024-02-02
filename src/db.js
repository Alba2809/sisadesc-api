import mongoose from "mongoose";
import { MONGO_URL } from "./config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("DB mongo is connected");
  } catch (error) {
    console.log(error);
  }
};

/* 
import { createPool } from "mysql2/promise"

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "bd_sisadesc"
})

export const connectDB = async () => {
  try {
    await pool.query("select 1 + 1 as result")
    console.log("DB mysql is connected")
  } catch (error) {
    console.log(error)
  }
} */