import { createAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Role from "../models/role.model.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email }).populate({
      path: "role",
      select: "name",
    });

    if (!userFound) return res.status(400).json(["Usuario no encontrado"]);

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json(["¡Usuario o contraseña incorrectos!"]);

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token, {
      sameSite: "None",
      secure: true,
      httpOnly: false,
    });
    res.json({
      firstname: userFound.firstname,
      role: userFound.role,
      email: userFound.email,
      imageperfile: userFound.imageperfile,
      token,
    });
  } catch (error) {
    res.status(500).json([error.message]);
    console.log(error);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

/* export const history = async (req, res) => {
  try {
    const lamps = await Lamp.find().where("user", req.user.id).lean();
    const complaints = await Complaint.find().where("user", req.user.id).lean();
    const natures = await Nature.find().where("user", req.user.id).lean();
    const waters = await Water.find().where("user", req.user.id).lean();
    const officials = await Official.find().where("user", req.user.id).lean();

    const lampsWithTitle = lamps.map((lamp) => ({ ...lamp, title: "lamp" }));
    const complaintsWithTitle = complaints.map((complaint) => ({
      ...complaint,
      title: "complaint",
    }));
    const naturesWithTitle = natures.map((nature) => ({
      ...nature,
      title: "nature",
    }));
    const watersWithTitle = waters.map((water) => ({
      ...water,
      title: "water",
    }));
    const officialsWithTitle = officials.map((official) => ({
      ...official,
      title: "official",
    }));

    const allData = [
      ...lampsWithTitle,
      ...complaintsWithTitle,
      ...naturesWithTitle,
      ...watersWithTitle,
      ...officialsWithTitle,
    ];
    const sortedData = allData.sort((a, b) => b.createdAt - a.createdAt);

    return res.json(sortedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; */

/* export const update = async (req, res) => {
  const { email } = req.body;
  try {
    const sameEmail = await User.findOne({ email });
    if (sameEmail)
      return res
        .status(400)
        .json(["El correo electrónico ya fue registrado anteriormente."]);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (!user) return res.status(400).json(["Usuario no encontrado."]);

    res.json({
      firstname: user.firstname,
      lastname: user.lastname,
      phonenumber: user.phonenumber,
      role: user.role,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; */

export const getUser = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id).populate({
      path: "role",
      select: "name",
    });

    if (!userFound) return res.status(400).json(["Usuario no encontrado."]);

    res.json(userFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findById(user.id).populate({
      path: "role",
      select: "name",
    });
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      firstname: userFound.firstname,
      role: userFound.role,
      email: userFound.email,
    });
  });
};
