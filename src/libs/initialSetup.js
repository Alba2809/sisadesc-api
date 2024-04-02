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
      pool.query("INSERT INTO roles (name) VALUES (?)", ["counselor"]),
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
        "INSERT INTO users (firstname, lastnamepaternal, lastnamematernal, status, email, password, role, curp) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "Juan",
          "Perez",
          "García",
          "Activo",
          "administrador@gmail.com",
          await bcrypt.hash("administrador", 10),
          roles.find((role) => role.name === "admin").id,
          "JPGA980101HMCRRR06",
        ]
      ), /* Administrador */
      pool.query(
        "INSERT INTO users (firstname, lastnamepaternal, lastnamematernal, status, email, password, role, curp) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "Pablo",
          "Sanchez",
          "Perez",
          "Activo",
          "teacher1@gmail.com",
          await bcrypt.hash("teacher1", 10),
          roles.find((role) => role.name === "teacher").id,
          "PSPA980101HMCRRR06",
        ]
      ), /* Maestro */
      pool.query(
        "INSERT INTO users (firstname, lastnamepaternal, lastnamematernal, status, email, password, role, curp) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "Juan",
          "Gutierrez",
          "Peralta",
          "Activo",
          "counselor1@gmail.com",
          await bcrypt.hash("counselor1", 10),
          roles.find((role) => role.name === "counselor").id,
          "JGPA980101HMCRRR07",
        ]
      ), /* Asesor */
      pool.query(
        "INSERT INTO users (firstname, lastnamepaternal, lastnamematernal, status, email, password, role, curp) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "Marta",
          "Sanchez",
          "Sanchez",
          "Activo",
          "secretary1@gmail.com",
          await bcrypt.hash("secretary1", 10),
          roles.find((role) => role.name === "secretary").id,
          "MSPA980101HMCRRR08",
        ]
      ), /* Secretaria */
      pool.query(
        "INSERT INTO users (firstname, lastnamepaternal, lastnamematernal, status, email, password, role, curp) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "Axel",
          "Herrrera",
          "Alba",
          "Activo",
          "principal1@gmail.com",
          await bcrypt.hash("principal1", 10),
          roles.find((role) => role.name === "principal").id,
          "AHCA980101HMCRRR09",
        ]
      ), /* Director */
      pool.query(
        "INSERT INTO users (firstname, lastnamepaternal, lastnamematernal, status, email, password, role, curp) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "Jhonatan",
          "Pale",
          "Colorado",
          "Activo",
          "viceprincipal1@gmail.com",
          await bcrypt.hash("viceprincipal1", 10),
          roles.find((role) => role.name === "viceprincipal").id,
          "JPCA980101HMCRRR10",
        ]
      ), /* Vicedirector */
      pool.query(
        "INSERT INTO users (firstname, lastnamepaternal, lastnamematernal, status, email, password, role, curp) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "Luis",
          "Migule",
          "Conde",
          "Activo",
          "coordinador1@gmail.com",
          await bcrypt.hash("coordinador1", 10),
          roles.find((role) => role.name === "academiccoor").id,
          "LMCA980101HMCRRR11",
        ]
      ), /* Coordinador académico */
    ]);
  } catch (error) {
    console.log(error);
  }
};
