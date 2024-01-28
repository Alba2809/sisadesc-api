import bcrypt from "bcryptjs";
import getNextSequence from "../libs/counters.js";
import Role from "../models/role.model.js";
import User from "../models/user.model.js";
import Teacher from "../models/teacher.model.js";
import Student from "../models/student.model.js";
import Subject from "../models/subject.model.js";

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
    const userFound = await User.findOne({ email });
    if (userFound)
      return res
        .status(400)
        .json(["El correo electrónico ya fue registrado anteriormente."]);

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastnamepaternal,
      lastnamematernal,
      curp,
      rfc,
      direction: {
        street: "",
        colony: "",
        postalcode: "",
      },
      phonenumber: "",
      imageperfile: "",
      status: "Activo",
      email,
      password: passwordHash,
    });

    if (role) {
      const foundRol = await Role.findOne({ name: role });
      if (!foundRol) return res.status(404).json(["Rol no encontrado."]);
      newUser.role = foundRol._id;
    } else {
      const rolDefault = await Role.findOne({ name: "student" });
      newUser.role = rolDefault._id;
    }

    const userSaved = await newUser.save();

    res.json({
      firstname: userSaved.firstname,
      email: userSaved.email,
      role: userSaved.role,
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
    street,
    colony,
    postalcode,
    phonenumber,
    birthdate,
    gender,
  } = req.body;

  try {
    const teacherid = await getNextSequence("Teacher_ID");
    const paddedCounter = teacherid.toString().padStart(3, "0");

    const newTeacher = new Teacher({
      teacherid: `MTRO${paddedCounter}`,
      firstname,
      lastnamepaternal,
      lastnamematernal,
      curp,
      rfc,
      direction: {
        street,
        colony,
        postalcode,
      },
      phonenumber,
      birthdate,
      gender,
    });

    const userSaved = await newTeacher.save();

    res.json({
      firstname: userSaved.firstname,
      lastnamepaternal: userSaved.lastnamepaternal,
      lastnamematernal: userSaved.lastnamematernal,
      teacherid: userSaved.teacherid,
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
    street,
    colony,
    postalcode,
    phonenumber,
    email,
    group,
    subjects,
    gender,
    birthdate,
  } = req.body;

  try {
    const studentid = await getNextSequence("Student_ID");
    const paddedCounter = studentid.toString().padStart(3, "0");

    const foundSubjects = await Subject.find({ name: { $in: subjects } });
    const subjectIds = foundSubjects.map((subject) => subject._id);

    if (subjectIds.length !== subjects.length) {
      return res
        .status(404)
        .json(["Al menos una asignatura no fue encontrada"]);
    }

    const newStudent = new Student({
      studentid: `STD${paddedCounter}`,
      firstname,
      lastnamepaternal,
      lastnamematernal,
      curp,
      direction: {
        street,
        colony,
        postalcode,
      },
      phonenumber,
      email,
      group,
      subjects: subjectIds,
      gender,
      birthdate,
    });

    const studentSaved = await newStudent.save();

    res.json({
      firstname: studentSaved.firstname,
      lastnamepaternal: studentSaved.lastnamepaternal,
      lastnamematernal: studentSaved.lastnamematernal,
      studentid: studentSaved.studentid,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerSubject = async (req, res) => {
  const {
    name,
    code,
  } = req.body;

  try {
    const subjectid = await getNextSequence("Subject_ID");
    const paddedCounter = subjectid.toString().padStart(3, "0");

    const newSubject = new Subject({
      studentid: `ASIG${paddedCounter}`,
      name,
      code,
    });

    const subjectSaved = await newSubject.save();

    res.json({
      name: subjectSaved.name,
      subjectid: subjectSaved.subjectid,
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
    email,
    street,
    colony,
    postalcode,
    phonenumber,
    birthdate,
    status,
    role,
    imageperfile,
  } = req.body;
  try {
    const sameEmail = await User.findOne({ email });
    if (sameEmail)
      return res
        .status(400)
        .json(["El correo electrónico ya fue registrado anteriormente."]);

    const updates = {
      firstname,
      lastnamepaternal,
      lastnamematernal,
      curp,
      rfc,
      direction: {
        street,
        colony,
        postalcode,
      },
      phonenumber,
      email,
      birthdate,
      status,
      imageperfile,
    };

    const foundRol = await Role.findOne({ name: role });
    updates.role = foundRol._id;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: updates,
      },
      {
        new: true,
      }
    );

    if (!user) return res.status(404).json(["Usuario no encontrado."]);

    res.json({
      firstname: user.firstname,
      role: user.role,
      email: user.email,
    });
  } catch (error) {
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
    gender,
    phonenumber,
    birthdate,
    street,
    colony,
    postalcode,
  } = req.body;

  try {
    const updates = {
      firstname,
      lastnamepaternal,
      lastnamematernal,
      curp,
      rfc,
      gender,
      phonenumber,
      birthdate,
      direction: {
        street,
        colony,
        postalcode,
      },
    };

    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      {
        $set: updates,
      },
      {
        new: true,
      }
    );

    if (!teacher) return res.status(404).json(["Docente no encontrado."]);

    res.json({
      firstname: teacher.firstname,
      curp: teacher.curp,
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
    street,
    colony,
    postalcode,
    email,
    subjects,
    group,
    phonenumber,
  } = req.body;

  try {
    const foundSubjects = await Subject.find({ name: { $in: subjects } });
    const subjectIds = foundSubjects.map((subject) => subject._id);

    if (subjectIds.length !== subjects.length) {
      return res
        .status(404)
        .json(["Al menos una asignatura no fue encontrada"]);
    }

    const updates = {
      firstname,
      lastnamepaternal,
      lastnamematernal,
      curp,
      gender,
      birthdate,
      direction: {
        street,
        colony,
        postalcode,
      },
      email,
      subjects: subjectIds,
      group,
      phonenumber,
    };

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: updates,
      },
      {
        new: true,
      }
    );

    if (!student) return res.status(404).json(["Estudiante no encontrado."]);

    res.json({
      firstname: student.firstname,
      curp: student.curp,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSubject = async (req, res) => {
  try {

    const subject = await Subject.findByIdAndUpdate(
      req.subject.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (!subject) return res.status(404).json(["Materia no encontrada."]);

    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const userFound = await User.findById(req.params.id);

    if (!userFound) return res.status(404).json(["Usuario no encontrado."]);

    res.json(userFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate({
      path: "role",
      select: "name _id",
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeacher = async (req, res) => {
  try {
    const teacherFound = await Teacher.findById(req.params.id);

    if (!teacherFound) return res.status(404).json(["Docente no encontrado."]);

    res.json(teacherFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudent = async (req, res) => {
  try {
    const studentFound = await Student.findById(req.params.id);

    if (!studentFound) return res.status(404).json(["Estudiante no encontrado."]);

    res.json(studentFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubject = async (req, res) => {
  try {
    const subjectFound = await Subject.findById(req.params.id);

    if (!subjectFound) return res.status(404).json(["Materia no encontrada."]);

    res.json(subjectFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id);
    if (!user) return res.status(404).json(["Usuario no encontrado."]);

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id);
    if (!teacher) return res.status(404).json(["Docente no encontrado."]);

    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id);
    if (!student) return res.status(404).json(["Estudiante no encontrado."]);

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id);
    if (!subject) return res.status(404).json(["Materia no encontrada."]);

    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
