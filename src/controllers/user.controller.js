import { deleteImagePerfile, uploadImagePerfile } from "../config.js";
import { AddressModel } from "../models/address.model.js";
import { RoleModel } from "../models/role.model.js";
import { UserModel } from "../models/user.model.js";

export const registerUser = async (req, res) => {
  const { firstname, role, email } = req.body;

  try {
    console.log(role);
    const roleFound = await RoleModel.getById(role);

    if (!roleFound) return res.status(404).json(["Rol no encontrado."]);

    const emailExist = await UserModel.emailExist(email);

    if (emailExist)
      return res
        .status(400)
        .json(["El email ya ha sido registrado anteriormente."]);

    const result = await UserModel.create(req.body);

    res.json({
      firstname,
      email,
      role,
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al registrar el usuario."]);
  }
};

export const updateUser = async (req, res) => {
  const { firstname, addressid, email, role } = req.body;
  const newImage = req.file;
  let uploadedImage = null;

  try {
    /*  */
    const emailExist = await UserModel.emailExistUpdate(email, req.params.id);

    if (emailExist)
      return res
        .status(400)
        .json(["El correo electrónico ya fue registrado anteriormente."]);

    /*  */
    const roleFound = await RoleModel.getById(+role);

    if (!roleFound) return res.status(404).json(["Rol inválido."]);

    /*  */
    const addressFound = await AddressModel.getById(+addressid);

    if (!addressFound)
      return res.status(404).json(["Dirección no encontrada."]);

    /*  */
    const userFound = await UserModel.getById(req.params.id);
    if (req.file) {
      if (userFound.imageperfile && userFound.imageperfile !== "") {
        deleteImagePerfile(userFound.imageperfile);
      }

      uploadedImage = await uploadImagePerfile(newImage);
      if (!uploadedImage)
        return res
          .status(404)
          .json([
            "Hubo un problema al actualizar la imagen de perfil. Intente de nuevo.",
          ]);
    } else {
      uploadedImage = userFound.imageperfile;
    }

    const result = await UserModel.update(
      req.params.id,
      req.body,
      uploadedImage
    );

    if (result.affectedRows === 0)
      return res
        .status(404)
        .json(["Hubo un problema al actualizar el usuario."]);

    res.json({
      firstname,
      role,
      email,
    });
  } catch (error) {
    if (uploadedImage) deleteImagePerfile(uploadedImage);
    res.status(500).json(["Hubo un error al actualizar el usuario."]);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.getById(req.params.id);

    if (!user) return res.status(404).json(["Usuario no encontrado."]);

    res.json(user);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener el usuario."]);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.getAll();

    res.json(users);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener los usuarios."]);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await UserModel.delete(req.params.id);

    if (result.affectedRows <= 0)
      return res.status(404).json(["Usuario no encontrado."]);

    res.json(result.affectedRows);
  } catch (error) {
    res.status(500).json(["Hubo un error al eliminar el usuario."]);
  }
};
