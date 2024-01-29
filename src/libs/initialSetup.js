import Role from "../models/role.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    await Promise.all([
      new Role({ name: "admin" }).save(),
      new Role({ name: "student" }).save(),
      new Role({ name: "teacher" }).save(),
      new Role({ name: "tutor" }).save(),
      new Role({ name: "secretary" }).save(),
      new Role({ name: "principal" }).save(),
      new Role({ name: "viceprincipal" }).save(),
      new Role({ name: "academiccoor" }).save(),
    ]);
  } catch (error) {
    console.log(error);
  }
};

export const createUsers = async () => {
  try {
    const count = await User.estimatedDocumentCount();
    const roles = await Role.find();

    if (count > 0) return;

    await Promise.all([
      new User({
        firstname: "Juan",
        lastnamepaternal: "Perez",
        lastnamematernal: "García",
        curp: "Vacio",
        rfc: "Vacio",
        direction: {
          street: "Vacio",
          colony: "Vacio",
          postalcode: 0,
        },
        phonenumber: "Vacio",
        birthdate: "",
        status: "Activo",
        imageperfile: "",
        email: "administrador@gmail.com",
        password: await bcrypt.hash("administrador", 10),
        role: roles.find((role) => role.name === "admin")._id,
      }).save() /* Administrador */,
      new User({
        firstname: "Pedro",
        lastnamepaternal: "García",
        lastnamematernal: "Perez",
        curp: "Vacio",
        rfc: "Vacio",
        direction: {
          street: "Vacio",
          colony: "Vacio",
          postalcode: 0,
        },
        phonenumber: "Vacio",
        birthdate: "",
        status: "Activo",
        imageperfile: "",
        email: "student1@gmail.com",
        password: await bcrypt.hash("student1", 10),
        role: roles.find((role) => role.name === "student")._id,
      }).save() /* Estudiante */,
      new User({
        firstname: "José",
        lastnamepaternal: "Alba",
        lastnamematernal: "García",
        curp: "Vacio",
        rfc: "Vacio",
        direction: {
          street: "Vacio",
          colony: "Vacio",
          postalcode: 0,
        },
        phonenumber: "Vacio",
        birthdate: "",
        status: "Activo",
        imageperfile: "",
        email: "teacher1@gmail.com",
        password: await bcrypt.hash("teacher1", 10),
        role: roles.find((role) => role.name === "teacher")._id,
      }).save() /* Maestro */,
      new User({
        firstname: "Pablo",
        lastnamepaternal: "Perez",
        lastnamematernal: "Peralta",
        curp: "Vacio",
        rfc: "Vacio",
        direction: {
          street: "Vacio",
          colony: "Vacio",
          postalcode: 0,
        },
        phonenumber: "Vacio",
        birthdate: "",
        status: "Activo",
        imageperfile: "",
        email: "tutor1@gmail.com",
        password: await bcrypt.hash("tutor1", 10),
        role: roles.find((role) => role.name === "tutor")._id,
      }).save() /* Padre/Tutor */,
      new User({
        firstname: "Sebastián",
        lastnamepaternal: "Hernández",
        lastnamematernal: "García",
        curp: "Vacio",
        rfc: "Vacio",
        direction: {
          street: "Vacio",
          colony: "Vacio",
          postalcode: 0,
        },
        phonenumber: "Vacio",
        birthdate: "",
        status: "Activo",
        imageperfile: "",
        email: "secretary1@gmail.com",
        password: await bcrypt.hash("secretary1", 10),
        role: roles.find((role) => role.name === "secretary")._id,
      }).save() /* Secreatria */,
      new User({
        firstname: "Axel",
        lastnamepaternal: "Herrera",
        lastnamematernal: "Alba",
        curp: "Vacio",
        rfc: "Vacio",
        direction: {
          street: "Vacio",
          colony: "Vacio",
          postalcode: 0,
        },
        phonenumber: "Vacio",
        birthdate: "",
        status: "Activo",
        imageperfile: "",
        email: "principal1@gmail.com",
        password: await bcrypt.hash("principal1", 10),
        role: roles.find((role) => role.name === "principal")._id,
      }).save() /* Director */,
      new User({
        firstname: "Jhonatan",
        lastnamepaternal: "Pale",
        lastnamematernal: "Colorado",
        curp: "Vacio",
        rfc: "Vacio",
        direction: {
          street: "Vacio",
          colony: "Vacio",
          postalcode: 0,
        },
        phonenumber: "Vacio",
        birthdate: "",
        status: "Activo",
        imageperfile: "",
        email: "viceprincipal1@gmail.com",
        password: await bcrypt.hash("viceprincipal1", 10),
        role: roles.find((role) => role.name === "viceprincipal")._id,
      }).save() /* Vicedirector */,
      new User({
        firstname: "Evelin",
        lastnamepaternal: "Montero",
        lastnamematernal: "Gómez",
        curp: "Vacio",
        rfc: "Vacio",
        direction: {
          street: "Vacio",
          colony: "Vacio",
          postalcode: 0,
        },
        phonenumber: "Vacio",
        birthdate: "",
        status: "Activo",
        imageperfile: "",
        email: "coordinador1@gmail.com",
        password: await bcrypt.hash("coordinador1", 10),
        role: roles.find((role) => role.name === "academiccoor")._id,
      }).save() /* Coordinador académico */,
    ]);
  } catch (error) {
    console.log(error);
  }
};
