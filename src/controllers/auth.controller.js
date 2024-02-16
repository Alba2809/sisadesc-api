import { createAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";
import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [userFound] = await pool.query(
      "SELECT users.*, roles.id AS role_id, roles.name AS role_name FROM users JOIN roles ON users.role = roles.id WHERE users.email = ?",
      [email]
    );

    if (!userFound || userFound.length < 1)
      return res.status(400).json(["Usuario no encontrado"]);

    const isMatch = await bcrypt.compare(password, userFound[0].password);

    if (!isMatch)
      return res.status(400).json(["¡Usuario o contraseña incorrectos!"]);

    const token = await createAccessToken({ id: userFound[0].id });

    res.cookie("token", token, {
      sameSite: "None",
      secure: true,
      httpOnly: false,
    });
    
    res.json({
      firstname: userFound[0].firstname,
      role_name: userFound[0].role_name,
      email: userFound[0].email,
      imageperfile: userFound[0].imageperfile,
      token,
    });
  } catch (error) {
    res.status(500).json([error.message]);
    console.log(error);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const getUser = async (req, res) => {
  try {
    const [userFound] = await pool.query(
      "SELECT users.*, roles.name AS role_name FROM users JOIN roles ON users.role = roles.id WHERE users.id = ?",
      [req.user.id]
    );
    
    if (!userFound[0]) return res.status(400).json(["Usuario no encontrado."]);

    res.json(userFound[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const [userFound] = await pool.query("SELECT users.*, roles.name AS role_name FROM users JOIN roles ON users.role = roles.id WHERE users.id = ?", [user.id])
    
    if (!userFound[0]) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      firstname: userFound[0].firstname,
      role: userFound[0].role_name,
      email: userFound[0].email,
    });
  });
};
