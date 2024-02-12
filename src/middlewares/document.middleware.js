import { pool } from "../db.js";

export const validateDocument = () => async (req, res, next) => {
  try {
    const userFound = await pool.query("SELECT * FROM users JOIN roles ON users.role = roles.id WHERE users.id = ?", [req.user.id])
    const documentName = req.url.split("/").pop();
    const hasMatchingDocumentWater = await Water.exists({
      user: req.user.id,
      document: documentName,
    });
    const hasMatchingDocumentOfficial = await Official.exists({
      user: req.user.id,
      documentAccepted: documentName,
    });
    if (userFound.role.name === "citizen") {
      if (!hasMatchingDocumentWater && !hasMatchingDocumentOfficial)
        return res.status(401).json("Not found");
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
