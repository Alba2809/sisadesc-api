import { GradeModel } from "../models/grade.model.js";
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

export const getSubjectStudents = async (req, res) => {
  try {
    const students = await SubjectModel.getSubjectStudents(req.params.id);

    return res.json(students);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener los estudiantes."]);
  }
};

export const getGrades = async (req, res) => {
  try {
    const students = await SubjectModel.getSubjectStudents(req.params.id);

    if(!students.length) return res.json([]);
    
    const grades = await GradeModel.getGradesOfStudents(
      students.map((student) => student.student_id),
      req.params.id
    );

    const studentsWithGrades = students.map((student) => {
      const grade = grades.filter(
        (value) => value.student_id === student.student_id
      );
      return {
        ...student,
        grades: grade,
      };
    });
    return res.json(studentsWithGrades);
  } catch (error) {
    console.log(error)
    res.status(500).json(["Hubo un error al obtener las calificaciones."]);
  }
}

