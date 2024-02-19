import { deleteImagePerfile, uploadImagePerfile } from "../config.js";
import { AssistModel } from "../models/assist.model.js";
import { StudentModel } from "../models/student.model.js";
import { SubjectModel } from "../models/subject.model.js";
import { TeacherModel } from "../models/teacher.model.js";
import { UserModel } from "../models/user.model.js";

export const getSubjects = async (req, res) => {
  try {
    const user = await UserModel.getById(req.user.id);
    const teacher = await TeacherModel.getByCurp(user.curp);
    const subjects = await SubjectModel.getSubjectsOfTeacher(teacher.id);

    res.json(subjects);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener las materias."]);
  }
};

export const getAssists = async (req, res) => {
  try {
    const students = await SubjectModel.getSubjectStudents(req.params.id);

    const assistants = await AssistModel.getAssistsOfStudents(
      students.map((student) => student.student_id),
      req.params.id
    );

    const studentsWithAssists = students.map((student) => {
      const assist = assistants.filter((value) => value.student_id === student.student_id);
      return {
        ...student,
        assists: assist,
      };
    });
    return res.json(studentsWithAssists);
  } catch (error) {
    res.status(500).json(["Hubo un error al registrar el usuario."]);
  }
};

export const registerAssists = async (req, res) => {
  const { students, date } = req.body;
  try {
    const subjectFound = await SubjectModel.getSubjectOfStudent(
      students[0]?.sub_stud_id
    );

    if (!subjectFound) return res.status(404).json(["Materia no encontrada."]);

    const existAssists = await AssistModel.existAssists(
      subjectFound.subject_id,
      date
    );

    if (existAssists.length > 0)
      return res
        .status(410)
        .json(["Las asistencias ya fueron registradas anteriormente."]);

    let studentsRegistered = [];
    const studentPromises = students.map(async (student) => {
      const rowStudent = await AssistModel.create(student, date);

      if (rowStudent.affectedRows === 1) {
        studentsRegistered.push(rowStudent.insertId);
      }
    });

    await Promise.all(studentPromises);

    if (studentsRegistered.length !== students?.length) {
      return res
        .status(400)
        .json([
          "No se pudieron registrar todas las asistencias. Intentelo de nuevo.",
        ]);
    }

    res.json({
      assists_registered: studentsRegistered,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(["Hubo un error al registrar las asistencias."]);
  }
};
