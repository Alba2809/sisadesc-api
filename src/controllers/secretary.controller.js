import { GradeModel } from "../models/grade.model.js";
import { PostModel } from "../models/post.model.js";
import { SubjectModel } from "../models/subject.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const getSubjects = async (req, res) => {
  try {
    const subjects = await SubjectModel.getSubjects();

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

export const registerGrades = async (req, res) => {
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

export const registerPost = async (req, res) => {
  try {
    const titleFound = await PostModel.getByTitle(req.body.title);

    if (titleFound?.length > 0)
      return res.status(400).json(["Ya existe un aviso con este título."]);

    const rowPost = await PostModel.create(req.body);

    if (rowPost.affectedRows === 1) {
      const newPost = await PostModel.getById(rowPost.insertId);

      if (newPost) {
        const userSocketId = getReceiverSocketId(req.user.id);
        if (userSocketId) {
          /* io used to emit to all users connected except the user who create the newPost */
          io.except(userSocketId).emit("post", newPost);
        }
      }
    }

    return res.json({
      post_registered: rowPost.insertId,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al registrar el aviso."]);
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.getAll();
    return res.json(posts);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener los avisos."]);
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await PostModel.getById(req.params.id);
    return res.json(post);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener el aviso."]);
  }
};

export const updatePost = async (req, res) => {
  try {
    const titleFound = await PostModel.getByTitleForUpdate(
      req.body.title,
      req.params.id
    );

    if (titleFound?.length > 0)
      return res.status(400).json(["Ya existe un aviso con este título."]);

    const rowPost = await PostModel.update(req.params.id, req.body);
    return res.json({
      post_updated: rowPost.affectedRows,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al actualizar el aviso."]);
  }
};

export const deletePost = async (req, res) => {
  try {
    const rowPost = await PostModel.delete(req.params.id);
    return res.json({
      post_deleted: rowPost.affectedRows,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al eliminar el aviso."]);
  }
};
