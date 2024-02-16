import { createAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";
import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await UserModel.getByEmail(email)

    if (!userFound)
      return res.status(400).json(["Usuario no encontrado"]);

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json(["¡Usuario o contraseña incorrectos!"]);

    const token = await createAccessToken({ id: userFound.id });

    res.cookie("token", token, {
      sameSite: "None",
      secure: true,
      httpOnly: false,
    });
    
    res.json({
      ...userFound,
      token,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al iniciar sesión."]);
    console.log(error);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const getUser = async (req, res) => {
  try {
    const userFound = await UserModel.getById(req.user.id)
    
    if (!userFound) return res.status(400).json(["Usuario no encontrado."]);

    res.json(userFound);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener los datos del usuario."]);
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

export const updatePassword = async (req, res) => {
  const { newPassword, oldPassword, confirmPassword } = req.body

  try {
    const userFound = await UserModel.getById(req.user.id)

    if (!userFound)
      return res.status(400).json(["Usuario no encontrado."]);

    const isMatch = await bcrypt.compare(oldPassword, userFound.password);

    if (!isMatch)
      return res.status(400).json(["La contraseña actual es incorrecta."]);

    const isMatchBoth = await bcrypt.compare(newPassword, userFound.password);

    if (isMatchBoth)
      return res.status(400).json(["No se ha ingresado una nueva contraseña."]);

    if(newPassword !== confirmPassword)
      return res.status(404).json(["Los campos de la contraseña nueva no coinciden."]);

    await UserModel.updatePassword(req.user.id, newPassword)

    return res.json(userFound);
  } catch (error) {
    res.status(500).json(["Hubo un error al actualizar la contraseña."]);
  }
}