import { AddressModel } from "../models/address.model.js";
import { TeacherModel } from "../models/teacher.model.js";

export const registerTeacher = async (req, res) => {
  const { firstname, lastnamepaternal, lastnamematernal, addressid } = req.body;

  try {
    const addressFound = await AddressModel.getById(+addressid);

    if (!addressFound)
      return res.status(404).json(["Dirección no encontrada."]);

    const row = await TeacherModel.create(req.body);

    res.json({
      firstname,
      lastnamepaternal,
      lastnamematernal,
      teacherid: "MTR" + row.insertId,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al registrar el docente."]);
  }
};

export const updateTeacher = async (req, res) => {
  const { firstname, curp, addressid } = req.body;

  try {
    const addressFound = await AddressModel.getById(+addressid);

    if (!addressFound)
      return res.status(404).json(["Dirección no encontrada."]);

    const result = await TeacherModel.update(req.params.id, req.body);

    if (result.affectedRows === 0)
      return res
        .status(404)
        .json(["Hubo un problema al actualizar el docente."]);

    res.json({
      firstname: firstname,
      curp: curp,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al actualizar el docente."]);
  }
};

export const getTeacher = async (req, res) => {
  try {
    const teacherFound = await TeacherModel.getById(req.params.id);

    if (!teacherFound) return res.status(404).json(["Docente no encontrado."]);

    res.json(teacherFound);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener el docente."]);
  }
};

export const getTeachers = async (req, res) => {
  try {
    const teachers = await TeacherModel.getAll();

    res.json(teachers);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener los docentes."]);
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const result = await TeacherModel.delete(req.params.id);

    if (result.affectedRows <= 0)
      return res.status(404).json(["Docente no encontrado."]);

    res.json(result.affectedRows);
  } catch (error) {
    res.status(500).json(["Hubo un error al eliminar el docente."]);
  }
};
