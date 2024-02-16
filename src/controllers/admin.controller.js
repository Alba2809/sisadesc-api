import { deleteImagePerfile, uploadImagePerfile } from "../config.js";
import { pool } from "../db.js";
import { AddressModel } from "../models/address.model.js";
import { ParentModel } from "../models/parent.model.js";
import { RoleModel } from "../models/role.model.js";
import { StudentModel } from "../models/student.model.js";
import { SubjectModel } from "../models/subject.model.js";
import { TeacherModel } from "../models/teacher.model.js";
import { UserModel } from "../models/user.model.js";

export const registerUser = async (req, res) => {
  const { firstname, role, email } = req.body;

  try {
    const roleFound = await RoleModel.getById({ id: role });

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
      (father_curp === "" && mother_curp === "") ||
      (!father_curp && !mother_curp)
    ) {
      return res.status(404).json(["Debe registrar al menos un padre."]);
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
    console.log(error);
    res.status(500).json(["Hubo un error al registrar el estudiante."]);
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
    console.log(error);
    res.status(500).json(["Hubo un error al registrar el padre."]);
  }
};

export const registerSubject = async (req, res) => {
  const { name, code, students, teacher } = req.body;

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

    const rowSubject = await SubjectModel.create(req.body);

    if (rowSubject.affectedRows !== 1) return;

    let studentsRegistered = [];
    if (students) {
      students?.map(async (student) => {
        const rowStudent = await SubjectModel.createSubjectStudent(
          rowSubject.insertId,
          student
        );

        if (rowStudent.affectedRows === 1)
          studentsRegistered.push(rowStudent.insertId);
      });

      if (studentsRegistered.length !== students?.length) {
        const result = await SubjectModel.deleteSubjectStudent(
          rowSubject.insertId
        );

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
      name,
      subjectid: "ASIG" + rowSubject.insertId,
      students_total: studentsRegistered.length,
    });
  } catch (error) {
    res.status(500).json(["Hubo un error al registrar la materia."]);
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
    if (req.file) {
      const userFound = await UserModel.getById(req.params.id);
      if (userFound.imageperfile && userFound[0].imageperfile !== "") {
        deleteImagePerfile(userFound[0].imageperfile);
      }

      uploadedImage = await uploadImagePerfile(newImage);
      if (!uploadedImage)
        return res
          .status(404)
          .json([
            "Hubo un problema al actualizar la imagen de perfil. Intente de nuevo.",
          ]);
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
    console.log(error);
    res.status(500).json(["Hubo un error al actualizar el estudiante."]);
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
    console.log(error);
    res.status(500).json(["Hubo un error al actualizar el padre."]);
  }
};

export const updateSubject = async (req, res) => {
  const { name, code, students, teacher } = req.body;
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
    if(students){
      const studentPromises = students?.map(async (student) => {
        const rowStudent = await SubjectModel.createSubjectStudent(
          req.params.id,
          student
        );
      
        if (rowStudent.affectedRows > 0) studentsRegistered.push(rowStudent.insertId);
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
    console.log(error)
    res.status(500).json(["Hubo un error al actualizar la materia."]);
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
    res;
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

export const getRoles = async (req, res) => {
  try {
    const [roles] = await pool.query("SELECT * FROM roles");

    res.json(roles);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener los roles."]);
  }
};

export const getAddresses = async (req, res) => {
  try {
    const [addresses] = await pool.query("SELECT * FROM addresses");

    res.json(addresses);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener las direcciones."]);
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

export const deleteParent = async (req, res) => {
  try {
    const result = await ParentModel.delete(req.params.id);
    if (result.affectedRows <= 0)
      return res.status(404).json(["Padre no encontrado."]);

    res.json(result.affectedRows);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Hubo un error al eliminar el padre."]);
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
