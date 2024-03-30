import { GradeModel } from "../models/grade.model.js";
import { SubjectModel } from "../models/subject.model.js";

export const registerGrades = async (req, res) => {
  const { students, evaluation_number } = req.body;
  try {
    console.log(students)
    const subjectFound = await SubjectModel.getSubjectOfStudent(
      students[0]?.sub_stud_id
    );

    if (!subjectFound) return res.status(404).json(["Materia no encontrada."]);

    const existGrades = await GradeModel.existGrades(
      subjectFound.subject_id,
      evaluation_number
    );

    if (existGrades.length > 0)
      return res
        .status(410)
        .json(["Ya se registraron las calificaciones de esta evaluación."]);

    let studentsRegistered = [];
    const studentPromises = students.map(async (student) => {
      const rowStudent = await GradeModel.create(student, evaluation_number);
      if (rowStudent.affectedRows === 1) {
        studentsRegistered.push(rowStudent.insertId);
      }

      return rowStudent;
    });

    await Promise.all(studentPromises);

    if (studentsRegistered.length !== students?.length) {
      const deletedGrades = studentsRegistered.map(
        async (student) => await GradeModel.delete(student)
      );

      await Promise.all(deletedGrades);

      return res
        .status(400)
        .json([
          "No se pudieron registrar todas las calificaciones. Intentelo de nuevo.",
        ]);
    }
    res.json({
      grades_registered: studentsRegistered,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(["Hubo un error al registrar las calificaciones."]);
  }
};

export const updateGrades = async (req, res) => {
  const { students, evaluation_number } = req.body;
  try {
    const subjectFound = await SubjectModel.getSubjectOfStudent(
      students[0]?.sub_stud_id
    );

    if (!subjectFound) return res.status(404).json(["Materia no encontrada."]);

    const existGrades = await GradeModel.existGrades(
      subjectFound.subject_id,
      evaluation_number
    );

    if (existGrades.length === 0)
      return res
        .status(410)
        .json(["No existe registros de calificaciones de esta evaluación."]);

    /* delete all grades of this evaluation */
    const deletedGrades = existGrades.map(
      async (grade) => await GradeModel.delete(grade.id)
    );

    await Promise.all(deletedGrades);

    /* register new grades */
    let studentsRegistered = [];
    const studentPromises = students.map(async (student) => {
      const rowStudent = await GradeModel.create(student, evaluation_number);
      if (rowStudent.affectedRows === 1) {
        studentsRegistered.push(rowStudent.insertId);
      }
      return rowStudent;
    });

    await Promise.all(studentPromises);

    if (studentsRegistered.length !== students?.length) {
      const deletedGrades = studentsRegistered.map(
        async (student) => await GradeModel.delete(student)
      );
      await Promise.all(deletedGrades);
      return res
        .status(400)
        .json([
          "No se pudieron registrar todas las calificaciones. Intentelo de nuevo.",
        ]);
    }

    res.json({
      grades_registered: studentsRegistered,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al registrar las calificaciones."]);
  }
};

export const getGrades = async (req, res) => {
  try {
    const students = await SubjectModel.getSubjectStudents(req.params.id);

    if (!students.length) return res.json([]);

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
    console.log(error);
    res.status(500).json(["Hubo un error al obtener las calificaciones."]);
  }
};
