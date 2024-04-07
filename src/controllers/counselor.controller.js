import { CounselorModel } from "../models/counselor.model.js";
import { UserModel } from "../models/user.model.js";

export const getCounselors = async (req, res) => {
  try {
    const counselors = await CounselorModel.getAll();
    return res.json(counselors);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Hubo un error al obtener los asesores."]);
  }
};

export const getCounselor = async (req, res) => {
  try {
    const counselor = await CounselorModel.getById(req.params.id);
    return res.json(counselor);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener el asesor."]);
  }
};

export const createCounselor = async (req, res) => {
  const { grade, group, counselor_curp } = req.body;
  try {
    const existGradeGroup = await CounselorModel.getByGradeGroup(grade, group);
    if (existGradeGroup)
      return res
        .status(404)
        .json(["Ya existe un asesor asignado a este grado y grupo."]);

    const existUser = await UserModel.getByCurp(counselor_curp);
    if (!existUser)
      return res.status(404).json(["No existe un asesor con esta CURP."]);

    const result = await CounselorModel.create(req.body);

    return res.json({
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al crear el asesor."]);
  }
};

export const updateCounselor = async (req, res) => {
  const { grade, group } = req.body;
  try {
    const existGradeGroup = await CounselorModel.getByGradeGroup(grade, group);
    if (existGradeGroup)
      return res
        .status(404)
        .json(["Ya existe un asesor asignado a este grado y grupo."]);

    const result = await CounselorModel.update(req.params.id, req.body);

    return res.json({
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al actualizar el asesor."]);
  }
};

export const deleteCounselor = async (req, res) => {
  try {
    const result = await CounselorModel.delete(req.params.id);

    return res.json({
      id: req.params.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(["Hubo un error al eliminar el asesor."]);
  }
};
