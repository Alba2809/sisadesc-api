import { deleteImagePerfile, uploadImagePerfile } from "../config.js";
import { pool } from "../db.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  const {
    firstname,
    lastnamepaternal,
    lastnamematernal,
    curp,
    rfc,
    role,
    email,
    password,
  } = req.body;

  try {
    /* Varificar que ya existe un usuario con el mismo email (diferente al que hizo la solicitud) */
    const [userFound] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (userFound[0])
      return res
        .status(400)
        .json(["El correo electrónico ya fue registrado anteriormente."]);

    const passwordHash = await bcrypt.hash(password, 10);

    /* Verificar si el rol existe */
    const [foundRol] = await pool.query("SELECT * FROM roles WHERE id = ?", [
      role,
    ]);

    if (!foundRol[0]) return res.status(404).json(["Rol no encontrado."]);

    const [rows] = await pool.query(
      "INSERT INTO user (firstname, lastnamepaternal, lastnamematernal, curp, rfc, role, email, password, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        firstname,
        lastnamepaternal,
        lastnamematernal,
        curp,
        rfc,
        foundRol[0].id,
        email,
        passwordHash,
        "Activo",
      ]
    );

    res.json({
      firstname: firstname,
      email: email,
      role: foundRol[0].name,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerTeacher = async (req, res) => {
  const {
    firstname,
    lastnamepaternal,
    lastnamematernal,
    curp,
    rfc,
    addressid,
    street,
    phonenumber,
    birthdate,
    gender,
  } = req.body;

  try {
    const [address] = await pool.query("SELECT * FROM addresses WHERE id = ?", [
      addressid,
    ]);

    if (!address[0]) return res.status(404).json(["Dirección no encontrada."]);

    const [rows] = await pool.query(
      "INSER INTO teachers (firstname, lastnamepaternal, lastnamematernal, curp, rfc, address_id, street, phonenumber, birthdate, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        firstname,
        lastnamepaternal,
        lastnamematernal,
        curp,
        rfc,
        addressid,
        street,
        phonenumber,
        birthdate,
        gender,
      ]
    );

    res.json({
      firstname: firstname,
      lastnamepaternal: lastnamepaternal,
      lastnamematernal: lastnamematernal,
      teacherid: "MTR" + rows.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerStudent = async (req, res) => {
  const {
    firstname,
    lastnamepaternal,
    lastnamematernal,
    curp,
    gender,
    birthdate,
    addressid,
    street,
    email,
    group,
    phonenumber,
  } = req.body;

  try {
    const [address] = await pool.query("SELECT * FROM addresses WHERE id = ?", [
      addressid,
    ]);

    if (!address[0]) return res.status(404).json(["Dirección no encontrada."]);

    const [rows] = await pool.query(
      "INSER INTO students (firstname, lastnamepaternal, lastnamematernal, curp, gender, birthdate, address_id, street, email, group, phonenumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        firstname,
        lastnamepaternal,
        lastnamematernal,
        curp,
        gender,
        birthdate,
        addressid,
        street,
        email,
        group,
        phonenumber,
      ]
    );

    res.json({
      firstname: firstname,
      lastnamepaternal: lastnamepaternal,
      lastnamematernal: lastnamematernal,
      studentid: "STD" + rows.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerSubject = async (req, res) => {
  const { name, code, group, students, teacher } = req.body;

  try {
    const [sameCode] = await pool.query(
      "SELECT * FROM subjects WHERE code = ?",
      [code]
    );

    if (sameCode[0])
      return res
        .status(404)
        .json(["Ya existe una materia con el mismo código"]);

    const [foundStudents] = await pool.query(
      "SELECT COUNT(*) AS total FROM students WHERE id IN (?)",
      [students.map((student) => student.id)]
    );

    if (foundStudents.length < students.length) {
      return res
        .status(404)
        .json([
          `No se encontraron ${
            students.length - foundStudents.length
          } estudiante(s)`,
        ]);
    }

    const [foundTeacher] = await pool.query(
      "SELECT * FROM teachers WHERE id = ?",
      [teacher.id]
    );

    if (!foundTeacher[0]) {
      return res.status(404).json(["No se encontró al docente."]);
    }

    const [rows] = await pool.query(
      "INSER INTO subjects (name, code, group, teacher) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [name, code, group, teacher.id]
    );

    let studentsRegistered = 0;
    students.map(async (student) => {
      const [rows] = await pool.query(
        "INSERT INTO subject_students (subject, student) VALUES (?, ?)",
        [rows.insertId, student.id]
      );

      if (rows) studentsRegistered++;
    });

    res.json({
      name: name,
      subjectid: "ASIG" + rows.insertId,
      students_total: studentsRegistered,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const {
    firstname,
    lastnamepaternal,
    lastnamematernal,
    curp,
    rfc,
    addressid,
    street,
    phonenumber,
    birthdate,
    status,
    email,
    role,
  } = req.body;
  const newImage = req.file;
  let uploadedImage = null;

  try {
    /*  */
    const [userFound] = await pool.query(
      "SELECT * FROM users WHERE email = ? AND id != ?",
      [email, req.params.id]
    );

    if (userFound[0])
      return res
        .status(400)
        .json(["El correo electrónico ya fue registrado anteriormente."]);

    /*  */
    const [foundRol] = await pool.query("SELECT * FROM roles WHERE id = ?", [
      role,
    ]);

    if (!foundRol[0]) return res.status(404).json(["Rol inválido."]);

    /*  */
    const [address] = await pool.query("SELECT * FROM addresses WHERE id = ?", [
      addressid,
    ]);

    if (!address[0]) return res.status(404).json(["Dirección no encontrada."]);

    /*  */
    if (req.file) {
      if (userFound[0].imageperfile && userFound[0].imageperfile !== "") {
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

    const [result] = await pool.query(
      "UPDATE users SET firstname = ?, lastnamepaternal = ?, lastnamematernal = ?, curp = ?, rfc = ?, address_id = ?, street = ?, phonenumber = ?, birthdate = ?, status = ?, imageperfile = ?, email = ?, role = ?",
      [
        firstname,
        lastnamepaternal,
        lastnamematernal,
        curp,
        rfc,
        addressid,
        street,
        phonenumber,
        birthdate,
        status,
        uploadedImage,
        email,
        foundRol[0].id,
      ]
    );

    if (result.affectedRows === 0)
      return res
        .status(404)
        .json(["Hubo un problema al actualizar el usuario."]);

    res.json({
      firstname: firstname,
      role: foundRol[0].name,
      email: email,
    });
  } catch (error) {
    if (uploadedImage) deleteImagePerfile(uploadedImage);
    res.status(500).json({ message: error.message });
  }
};

export const updateTeacher = async (req, res) => {
  const {
    firstname,
    lastnamepaternal,
    lastnamematernal,
    curp,
    rfc,
    addressid,
    street,
    phonenumber,
    birthdate,
    gender,
  } = req.body;

  try {
    const [address] = await pool.query("SELECT * FROM addresses WHERE id = ?", [
      addressid,
    ]);

    if (!address[0]) return res.status(404).json(["Dirección no encontrada."]);

    /*  */
    const [result] = await pool.query(
      "UPDATE teachers SET firstname = ?, lastnamepaternal = ?, lastnamematernal = ?, curp = ?, rfc = ?, address_id = ?, street = ?, phonenumber = ?, birthdate = ?, gender = ?",
      [
        firstname,
        lastnamepaternal,
        lastnamematernal,
        curp,
        rfc,
        address[0].id,
        street,
        phonenumber,
        birthdate,
        gender,
      ]
    );

    if (result.affectedRows === 0)
      return res
        .status(404)
        .json(["Hubo un problema al actualizar el docente."]);

    res.json({
      firstname: firstname,
      curp: curp,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  const {
    firstname,
    lastnamepaternal,
    lastnamematernal,
    curp,
    gender,
    birthdate,
    addressid,
    street,
    email,
    group,
    phonenumber,
  } = req.body;

  try {
    const [address] = await pool.query("SELECT * FROM addresses WHERE id = ?", [
      addressid,
    ]);

    if (!address[0]) return res.status(404).json(["Dirección no encontrada."]);

    /*  */
    const [result] = await pool.query(
      "UPDATE students SET firstname = ?, lastnamepaternal = ?, lastnamematernal = ?, curp = ?, gender = ?, birthdate = ?, address_id = ?, street = ?, email = ?, group = ?, phonenumber = ?",
      [
        firstname,
        lastnamepaternal,
        lastnamematernal,
        curp,
        gender,
        birthdate,
        addressid,
        street,
        email,
        group,
        phonenumber,
      ]
    );

    if (result.affectedRows === 0)
      return res
        .status(404)
        .json(["Hubo un problema al actualizar el estudiante."]);

    res.json({
      firstname: firstname,
      curp: curp,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSubject = async (req, res) => {
  const { name, code, group, students, teacher } = req.body;
  try {
    const [sameCode] = await pool.query(
      "SELECT * FROM subjects WHERE code = ? AND id != ?",
      [code, req.params.id]
    );

    if (sameCode[0])
      return res
        .status(404)
        .json(["Ya existe una materia con el mismo código."]);

    /*  */
    const [foundStudents] = await pool.query(
      "SELECT COUNT(*) AS total FROM students WHERE id IN (?)",
      [students.map((student) => student.id)]
    );

    if (foundStudents.length < students.length) {
      return res
        .status(404)
        .json([
          `No se encontraron ${
            students.length - foundStudents.length
          } estudiante(s)`,
        ]);
    }

    /*  */
    const [foundTeacher] = await pool.query(
      "SELECT * FROM teachers WHERE id = ?",
      [teacher.id]
    );

    if (!foundTeacher[0]) {
      return res.status(404).json(["No se encontró al docente."]);
    }

    /* Se eliminan todos los estudiantes de la materia para poder ingresar a los otros estudiantes */
    const [result] = await pool.query(
      "DELETE FROM subject_students WHERE subject = ?",
      [req.params.id]
    );

    if (result.affectedRows <= 0)
      return res
        .status(404)
        .json([
          "No se pudieron reemplezar los estudiantes de la materia. Intente de nuevo",
        ]);

    /*  */
    const [resultSubject] = await pool.query(
      "UPDATE subjects SET name = ?, code = ?, group = ?, teacher = ?",
      [name, code, group, teacher.id]
    );

    students.map(async (student) => {
      const [rows] = await pool.query(
        "INSERT INTO subject_students (subject, student) VALUES (?, ?)",
        [rows.insertId, student.id]
      );
    });

    if (resultSubject.affectedRows === 0)
      return res.status(404).json(["Materia no encontrada."]);

    res.json(resultSubject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const [userFound] = await pool.query(
      "SELECT users.*, role.name AS role_name, addresses.CP AS address_cp, addresses.asentamiento AS address_settlement, addresses.tipo_asentamiento AS address_type, addresses.municipio AS address_town, addresses.estado AS address_state, addresses.ciudad AS address_city from users JOIN roles ON users.role = roles.id JOIN addresses ON users.address_id = addresses.id WHERE users.id = ?",
      [req.params.id]
    );

    if (!userFound[0]) return res.status(404).json(["Usuario no encontrado."]);

    res.json(userFound[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT users.*, role.name AS role_name, addresses.CP AS address_cp, addresses.asentamiento AS address_settlement, addresses.tipo_asentamiento AS address_type, addresses.municipio AS address_town, addresses.estado AS address_state, addresses.ciudad AS address_city from users JOIN roles ON users.role = roles.id JOIN addresses ON users.address_id = addresses.id"
    );

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeacher = async (req, res) => {
  try {
    const [teacherFound] = await pool.query(
      "SELECT teachers.*, addresses.CP AS address_cp, addresses.asentamiento AS address_settlement, addresses.tipo_asentamiento AS address_type, addresses.municipio AS address_town, addresses.estado AS address_state, addresses.ciudad AS address_city from teachers JOIN addresses ON teachers.address_id = addresses.id WHERE teachers.id = ?",
      [req.params.id]
    );

    if (!teacherFound[0])
      return res.status(404).json(["Docente no encontrado."]);

    res.json(teacherFound[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeachers = async (req, res) => {
  try {
    const [teachers] = await pool.query(
      "SELECT teachers.*, addresses.CP AS address_cp, addresses.asentamiento AS address_settlement, addresses.tipo_asentamiento AS address_type, addresses.municipio AS address_town, addresses.estado AS address_state, addresses.ciudad AS address_city from teachers JOIN addresses ON teachers.address_id = addresses.id"
    );

    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudent = async (req, res) => {
  try {
    const [studentFound] = await pool.query(
      "SELECT students.*, addresses.CP AS address_cp, addresses.asentamiento AS address_settlement, addresses.tipo_asentamiento AS address_type, addresses.municipio AS address_town, addresses.estado AS address_state, addresses.ciudad AS address_city from students JOIN addresses ON students.address_id = addresses.id WHERE students.id = ?",
      [req.params.id]
    );

    if (!studentFound[0])
      return res.status(404).json(["Estudiante no encontrado."]);

    res.json(studentFound[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const [students] = await pool.query(
      "SELECT students.*, addresses.CP AS address_cp, addresses.asentamiento AS address_settlement, addresses.tipo_asentamiento AS address_type, addresses.municipio AS address_town, addresses.estado AS address_state, addresses.ciudad AS address_city from students JOIN addresses ON students.address_id = addresses.id"
    );

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubject = async (req, res) => {
  try {
    const [subjectFound] = await pool.query(
      "SELECT * from subjects WHERE id = ?",
      [req.params.id]
    );

    if (!subjectFound[0])
      return res.status(404).json(["Materia no encontrada."]);

    /*  */
    const [studentsID] = await pool.query(
      "SELECT * from subject_students WHERE subject = ?",
      [req.params.id]
    );

    /*  */
    const [teacherFound] = await pool.query(
      "SELECT * from teachers WHERE id = ?",
      [subjectFound[0].teacher]
    );

    /*  */
    const [studentsFound] = await pool.query(
      "SELECT students.*, addresses.CP AS address_cp, addresses.asentamiento AS address_settlement, addresses.tipo_asentamiento AS address_type, addresses.municipio AS address_town, addresses.estado AS address_state, addresses.ciudad AS address_city from students JOIN addresses ON students.address_id = addresses.id WHERE students.id IN (?)",
      [studentsID.map((value) => value.student)]
    );

    const allStudents = studentsFound.map((student) => ({
      id: student.id,
      firstname: student.firstname,
      lastnamepaternal: student.lastnamepaternal,
      lastnamematernal: student.lastnamematernal,
      curp: student.curp,
      gender: student.gender,
      birthdate: student.birthdate,
      address: {
        id: student.address_id,
        cp: student.address_cp,
        settlement: student.address_settlement,
        type: student.address_type,
        town: student.address_town,
        state: student.address_state,
        city: student.address_city,
        street: student.street,
      },
      email: student.email,
      group: student.group,
      phonenumber: student.phonenumber,
    }));

    const result = {
      ...subjectFound[0],
      teacher_data: teacherFound[0] ?? [],
      students: allStudents,
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const [subjects] = await pool.query("SELECT * from subjects");

    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRoles = async (req, res) => {
  try {
    const [roles] = await pool.query("SELECT * FROM roles")

    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [ req.params.id ]);

    if (result.affectedRows <= 0) return res.status(404).json(["Usuario no encontrado."]);

    res.json(result.affectedRows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM teachers WHERE id = ?", [ req.params.id ]);
    
    if (result.affectedRows <= 0) return res.status(404).json(["Docente no encontrado."]);

    res.json(result.affectedRows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM students WHERE id = ?", [ req.params.id ]);
    
    if (result.affectedRows <= 0) return res.status(404).json(["Docente no encontrado."]);

    res.json(result.affectedRows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM subjects WHERE id = ?", [ req.params.id ]);
    
    if (result.affectedRows <= 0) return res.status(404).json(["Docente no encontrado."]);

    res.json(result.affectedRows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
