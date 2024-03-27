import { StudentModel } from "../models/student.model.js";
import { SubjectModel } from "../models/subject.model.js";
import { TeacherModel } from "../models/teacher.model.js";
import { UserModel } from "../models/user.model.js";

export const registerSubject = async (req, res) => {
  const { name, code, teacher, counselor } = req.body;

  try {
    /* Código en uso */
    const sameCode = await SubjectModel.getByCode(code);

    if (sameCode)
      return res
        .status(404)
        .json(["Ya existe una materia con el mismo código"]);

    /* Existe el docente */
    if (teacher) {
      const foundTeacher = await TeacherModel.getByCurp(teacher);

      if (!foundTeacher) {
        return res.status(404).json(["No se encontró al docente."]);
      }
    }

    /* Existe el asesor */
    if (counselor) {
      const foundCounselor = await UserModel.getByCurp(counselor);

      if (!foundCounselor) {
        return res.status(404).json(["No se encontró al asesor."]);
      }

      if(foundCounselor.role.name !== "counselor") {
        return res.status(404).json(["La persona que intenta asignar como asesor no es un asesor."]);
      }
    }

    const rowSubject = await SubjectModel.create(req.body);

    if (rowSubject.affectedRows !== 1) return;

    res.json({
      name,
      subjectid: "ASIG" + rowSubject.insertId,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al registrar la materia."]);
  }
};

export const updateSubject = async (req, res) => {
  const { name, code, students, teacher, counselor } = req.body;
  try {
    /* Código en uso */
    const sameCode = await SubjectModel.getByCodeUpdate(req.params.id, code);

    if (sameCode)
      return res
        .status(404)
        .json(["Ya existe una materia con el mismo código"]);

    /* Existe el docente */
    if (teacher) {
      const foundTeacher = await TeacherModel.getByCurp(teacher);

      if (!foundTeacher) {
        return res.status(404).json(["No se encontró al docente."]);
      }
    }

    /* Existe el asesor */
    if (counselor) {
      const foundCounselor = await UserModel.getByCurp(counselor);

      if (!foundCounselor) {
        return res.status(404).json(["No se encontró al asesor."]);
      }

      if(foundCounselor.role.name !== "counselor") {
        return res.status(404).json(["La persona que intenta asignar como asesor no es un asesor."]);
      }
    }

    /* Existen los estudiantes */
    if (students) {
      const foundStudents = await StudentModel.getStudentsById(students);

      if (foundStudents.length < students.length) {
        return res
          .status(404)
          .json([
            `No se encontraron ${
              students.length - foundStudents.length
            } estudiante(s)`,
          ]);
      }
    }

    /* Se actualiza el registro general de la materia */
    const updatedSubject = await SubjectModel.update(req.params.id, req.body);

    if (updatedSubject.affectedRows <= 0)
      return res.status(400).json(["No se pudo actualizar la materia."]);

    /* Se eliminan los estudiantes existentes de la materia para ingresar los nuevos */
    await SubjectModel.deleteSubjectStudent(req.params.id);

    /* Se registran los estudiantes */
    let studentsRegistered = [];
    if (students) {
      const studentPromises = students?.map(async (student) => {
        const rowStudent = await SubjectModel.createSubjectStudent(
          req.params.id,
          student
        );

        if (rowStudent.affectedRows > 0)
          studentsRegistered.push(rowStudent.insertId);
      });

      await Promise.all(studentPromises);

      /* En caso de falla, se eliminan los registrados */
      if (studentsRegistered.length !== students?.length) {
        const result = await SubjectModel.deleteSubjectStudent(req.params.id);

        if (result.affectedRows <= 0)
          return res
            .status(404)
            .json(["No se pudieron eliminar todos lo registros."]);

        return res
          .status(400)
          .json([
            "No se pudieron registrar todos los estudiantes. Intentelo de nuevo.",
          ]);
      }
    }

    res.json({
      id: "ASIG" + req.params.id,
      name,
      students_total: studentsRegistered.length,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al actualizar la materia."]);
  }
};

export const updateStatusSubject = async (req, res) => {
  try {
    const result = await SubjectModel.updateStatus(req.params.id);

    if (result.affectedRows <= 0)
      return res.status(404).json(["No se pudo actualizar el estado."]);

    res.json({
      id: "ASIG" + req.params.id,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al actualizar la materia."]);
  }
};

export const getSubject = async (req, res) => {
  try {
    const subjectFound = await SubjectModel.getById(req.params.id);

    if (!subjectFound) return res.status(404).json(["Materia no encontrada."]);

    res.json(subjectFound);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener la materia."]);
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await SubjectModel.getAll();

    res.json(subjects);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener las materias."]);
  }
};

export const getSubjectsOfTeacher = async (req, res) => {
  try {
    const user = await UserModel.getById(req.user.id);
    const teacher = await TeacherModel.getByCurp(user.curp);
    const subjects = await SubjectModel.getSubjectsOfTeacher(teacher.id);

    res.json(subjects);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener las materias."]);
  }
};

export const getSubjectStudents = async (req, res) => {
  try {
    const students = await SubjectModel.getSubjectStudents(req.params.id);

    res.json(students);
  } catch (error) {
    res
      .status(500)
      .json(["Hubo un error al obtener los estudiantes de la materia."]);
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const result = await SubjectModel.deleteSubject(req.params.id);

    if (result.affectedRows <= 0)
      return res.status(404).json(["Materia no encontrada."]);

    res.json(result.affectedRows);
  } catch (error) {
    res.status(500).json(["Hubo un error al eliminar la materia."]);
  }
};
