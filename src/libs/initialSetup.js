import { pool } from "../db.js";
import bcrypt from "bcryptjs";

export const createRoles = async () => {
  try {
    const [ result ] = await pool.query("SELECT COUNT(*) AS total FROM roles");
    const count = result[0]["total"]
    
    if (count > 0) return;

    await Promise.all([
      pool.query("INSERT INTO roles (name) VALUES (?)", ["admin"]),
      pool.query("INSERT INTO roles (name) VALUES (?)", ["teacher"]),
      pool.query("INSERT INTO roles (name) VALUES (?)", ["parent"]),
      pool.query("INSERT INTO roles (name) VALUES (?)", ["tutor"]),
      pool.query("INSERT INTO roles (name) VALUES (?)", ["secretary"]),
      pool.query("INSERT INTO roles (name) VALUES (?)", ["principal"]),
      pool.query("INSERT INTO roles (name) VALUES (?)", ["viceprincipal"]),
      pool.query("INSERT INTO roles (name) VALUES (?)", ["academiccoor"]),
    ]);
  } catch (error) {
    console.log(error);
  }
};

export const createUsers = async () => {
  try {
    const [ result ] = await pool.query("SELECT COUNT(*) AS total FROM users");
    const [roles] = await pool.query("SELECT * FROM roles");
    const count = result[0]["total"]

    if (+count > 0) return;

    await Promise.all([
      pool.query(
        "INSERT INTO users (firstname, lastnamepaternal, lastnamematernal, status, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "Juan",
          "Perez",
          "García",
          "Activo",
          "administrador@gmail.com",
          await bcrypt.hash("administrador", 10),
          roles.find((role) => role.name === "admin").id,
        ]
      ), /* Administrador */
      pool.query(
        "INSERT INTO users (firstname, lastnamepaternal, lastnamematernal, status, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "Pablo",
          "Sanchez",
          "Perez",
          "Activo",
          "teacher1@gmail.com",
          await bcrypt.hash("teacher1", 10),
          roles.find((role) => role.name === "teacher").id,
        ]
      ), /* Maestro */
      pool.query(
        "INSERT INTO users (firstname, lastnamepaternal, lastnamematernal, status, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "Juan",
          "Gutierrez",
          "Peralta",
          "Activo",
          "tutor1@gmail.com",
          await bcrypt.hash("tutor1", 10),
          roles.find((role) => role.name === "tutor").id,
        ]
      ), /* Tutor */
      pool.query(
        "INSERT INTO users (firstname, lastnamepaternal, lastnamematernal, status, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "Marta",
          "Sanchez",
          "Sanchez",
          "Activo",
          "secretary1@gmail.com",
          await bcrypt.hash("secretary1", 10),
          roles.find((role) => role.name === "secretary").id,
        ]
      ), /* Secretaria */
      pool.query(
        "INSERT INTO users (firstname, lastnamepaternal, lastnamematernal, status, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "Axel",
          "Herrrera",
          "Alba",
          "Activo",
          "principal1@gmail.com",
          await bcrypt.hash("principal1", 10),
          roles.find((role) => role.name === "principal").id,
        ]
      ), /* Director */
      pool.query(
        "INSERT INTO users (firstname, lastnamepaternal, lastnamematernal, status, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "Jhonatan",
          "Pale",
          "Colorado",
          "Activo",
          "vicepincipal1@gmail.com",
          await bcrypt.hash("vicepincipal1", 10),
          roles.find((role) => role.name === "viceprincipal").id,
        ]
      ), /* Vicedirector */
      pool.query(
        "INSERT INTO users (firstname, lastnamepaternal, lastnamematernal, status, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "Luis",
          "Migule",
          "Conde",
          "Activo",
          "coordinador1@gmail.com",
          await bcrypt.hash("coordinador1", 10),
          roles.find((role) => role.name === "academiccoor").id,
        ]
      ), /* Coordinador académico */
    ]);
  } catch (error) {
    console.log(error);
  }
};
