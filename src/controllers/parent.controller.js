import { AddressModel } from "../models/address.model.js";
import { ParentModel } from "../models/parent.model.js";
import { UserModel } from "../models/user.model.js";

export const registerOneParent = async (req, res) => {
  const { addressid, curp } = req.body;

  try {
    const addressFoundStudent = await AddressModel.getById(addressid);

    if (!addressFoundStudent)
      return res.status(404).json(["Dirección no encontrada."]);

    const parentFound = await ParentModel.curpExist(curp);
    if (parentFound)
      return res.status(404).json(["Ya existe un padre con ese CURP."]);

    const result = await ParentModel.createParent(req.body);

    res.json({
      parentid: "PRT" + result.insertId,
      firstname: req.body.firstname,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al registrar el padre."]);
  }
};

export const registerParent = async (req, res) => {
  const {
    father_addressid,
    mother_addressid,
    tutor_addressid,
    father_firstname,
    mother_firstname,
    tutor_firstname,
  } = req.body;
  try {
    /* Validar direcciones */
    if (father_addressid) {
      const addressFoundFather = await AddressModel.getById(father_addressid);
      if (!addressFoundFather)
        return res.status(404).json(["Dirección del padre no encontrada."]);
    }

    if (mother_addressid) {
      const addressFoundMother = await AddressModel.getById(mother_addressid);
      if (!addressFoundMother)
        return res.status(404).json(["Dirección de la madre no encontrada."]);
    }

    if (tutor_addressid) {
      const addressFoundTutor = await AddressModel.getById(tutor_addressid);
      if (!addressFoundTutor)
        return res.status(404).json(["Dirección del tutor no encontrada."]);
    }

    /* Validar curps */
    if (father_firstname) {
      const curpExistFather = await ParentModel.curpExist(req.body.father_curp);
      if (curpExistFather)
        return res.status(400).json(["Ya existe un padre con el mismo CURP"]);

      const emailExistFather = await ParentModel.emailExist(
        req.body.father_email
      );
      if (emailExistFather)
        return res.status(400).json(["Ya existe un padre con el mismo email"]);
    } else if (mother_firstname) {
      const curpExistMother = await ParentModel.curpExist(req.body.mother_curp);
      if (curpExistMother)
        return res.status(400).json(["Ya existe una madre con el mismo CURP"]);

      const emailExistMother = await ParentModel.emailExist(
        req.body.mother_email
      );
      if (emailExistMother)
        return res.status(400).json(["Ya existe una madre con el mismo email"]);
    } else if (tutor_firstname) {
      const curpExistTutor = await ParentModel.curpExist(req.body.tutor_curp);
      if (curpExistTutor)
        return res.status(400).json(["Ya existe un tutor con el mismo CURP"]);

      const emailExistTutor = await ParentModel.emailExist(
        req.body.tutor_email
      );
      if (emailExistTutor)
        return res.status(400).json(["Ya existe un tutor con el mismo email"]);
    }

    const rowsParents = await ParentModel.create(req.body);

    return res.json(rowsParents);
  } catch (error) {
    res.status(500).json(["Hubo un error al registrar el padre."]);
  }
};

export const updateParent = async (req, res) => {
  const { firstname, lastname, curp, addressid } = req.body;
  try {
    const addressFound = await AddressModel.getById(addressid);
    if (!addressFound)
      return res.status(404).json(["Dirección no encontrada."]);

    const curpExist = await ParentModel.curpExistUpdate(curp, req.params.id);
    if (curpExist)
      return res.status(404).json(["El CURP ya fue registrado anteriormente."]);

    const emailExist = await UserModel.emailExistUpdate(curp, req.params.id);
    if (emailExist)
      return res
        .status(404)
        .json(["El correo electrónico ya fue registrado anteriormente."]);

    const result = await ParentModel.update(req.params.id, req.body);
    if (result.affectedRows === 0)
      return res.status(404).json(["No se pudo actualizar el padre."]);

    res.json({
      firstname,
      lastname,
      curp,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al actualizar el padre."]);
  }
};

export const getParent = async (req, res) => {
  try {
    const parentFound = await ParentModel.getById(req.params.id);
    if (!parentFound) return res.status(404).json(["Padre no encontrado."]);

    res.json(parentFound);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener el padre."]);
  }
};

export const getParents = async (req, res) => {
  try {
    const parents = await ParentModel.getAll();

    res.json(parents);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener los padres."]);
  }
};

export const deleteParent = async (req, res) => {
  try {
    const result = await ParentModel.delete(req.params.id);
    if (result.affectedRows <= 0)
      return res.status(404).json(["Padre no encontrado."]);

    res.json(result.affectedRows);
  } catch (error) {
    res.status(500).json(["Hubo un error al eliminar el padre."]);
  }
};
