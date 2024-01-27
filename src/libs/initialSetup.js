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
        email: "administrador@gmail.com",
        password: await bcrypt.hash("administrador", 10),
        role: roles.find((role) => role.name === "admin")._id,
      }).save() /* Ciudadano */,
    ]);
  } catch (error) {
    console.log(error);
  }
};
