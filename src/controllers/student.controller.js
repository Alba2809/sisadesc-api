import { AddressModel } from "../models/address.model.js";
import { ParentModel } from "../models/parent.model.js";
import { StudentModel } from "../models/student.model.js";

export const registerStudent = async (req, res) => {
  const {
    student_addressid,
    student_firstname,
    student_lastnamepaternal,
    father_firstname,
    mother_firstname,
    tutor_firstname,
    father_curp,
    mother_curp,
    tutor_curp,
  } = req.body;

  try {
    /* Validar direcciones */
    const addressFoundStudent = await AddressModel.getById(student_addressid);

    if (!addressFoundStudent)
      return res.status(404).json(["Dirección del estudiante no encontrada."]);

    /* Validar que se hayan ingresado al menos un padre */
    if (
      (father_curp === "" && mother_curp === "" && tutor_curp === "") ||
      (!father_curp && !mother_curp && !tutor_curp)
    ) {
      return res.status(404).json(["Debe registrar al menos un padre/tutor."]);
    }

    /* Validar curps de padres (cuando los padres ya existentes y no se requiere registrar nuevos) */
    let totalParents = 0;
    if (!father_firstname && father_curp) {
      const parentFoundFather = await ParentModel.curpExist(father_curp);

      if (!parentFoundFather)
        return res.status(404).json(["Padre no encontrado."]);
    }

    if (!mother_firstname && mother_curp) {
      const parentFoundMother = await ParentModel.curpExist(mother_curp);
      if (!parentFoundMother)
        return res.status(404).json(["Madre no encontrada."]);
    }

    if (!tutor_firstname && tutor_curp) {
      const parentFoundTutor = await ParentModel.curpExist(tutor_curp);
      if (!parentFoundTutor)
        return res.status(404).json(["Tutor no encontrado."]);
    }

    const rows = await StudentModel.create(req.body);

    res.json({
      studentid: "STD" + rows.insertId,
      student_firstname,
      student_lastnamepaternal,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al registrar el estudiante."]);
  }
};

export const updateStudent = async (req, res) => {
  const {
    student_firstname,
    student_curp,
    student_addressid,
    father_curp,
    mother_curp,
    tutor_curp,
  } = req.body;

  try {
    const addressFound = await AddressModel.getById(student_addressid);

    if (!addressFound)
      return res.status(404).json(["Dirección no encontrada."]);

    if (
      (father_curp === "" && mother_curp === "") ||
      (!father_curp && !mother_curp)
    ) {
      return res.status(404).json(["Debe registrar al menos un padre."]);
    }

    if (father_curp) {
      const curpFoundFather = await ParentModel.curpExist(father_curp);
      if (!curpFoundFather)
        return res.status(404).json(["CURP del padre no encontrada."]);
    }

    if (mother_curp) {
      const curpFoundMother = await ParentModel.curpExist(mother_curp);
      if (!curpFoundMother)
        return res.status(404).json(["CURP de la madre no encontrada."]);
    }

    if (tutor_curp) {
      const curpFoundTutor = await ParentModel.curpExist(tutor_curp);
      if (!curpFoundTutor)
        return res.status(404).json(["CURP del tutor no encontrada."]);
    }

    /*  */
    const result = await StudentModel.update(req.params.id, req.body);

    if (result.affectedRows === 0)
      return res.status(404).json(["No se pudo actualizar el estudiante."]);

    res.json({
      student_firstname,
      student_curp,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al actualizar el estudiante."]);
  }
};

export const getStudent = async (req, res) => {
  try {
    const studentFound = await StudentModel.getById(req.params.id);

    if (!studentFound)
      return res.status(404).json(["Estudiante no encontrado."]);

    res.json(studentFound);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener el estudiante."]);
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await StudentModel.getAll();

    res.json(students);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener los estudiantes."]);
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const result = await StudentModel.delete(req.params.id);

    if (result.affectedRows <= 0)
      return res.status(404).json(["Estudiante no encontrado."]);

    res.json(result.affectedRows);
  } catch (error) {
    res.status(500).json(["Hubo un error al eliminar el estudiante."]);
  }
};
