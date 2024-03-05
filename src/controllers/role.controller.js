import { RoleModel } from "../models/role.model.js";

export const getRoles = async (req, res) => {
  try {
    const roles = await RoleModel.getAll();

    res.json(roles);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener los roles."]);
  }
};
