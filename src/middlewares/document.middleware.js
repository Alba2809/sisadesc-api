import User from "../models/user.model.js";

export const validateDocument = () => async (req, res, next) => {
  try {
    const userFound = await User.findById(req.user.id).populate({ path: "role" });
    const documentName = req.url.split("/").pop();
    const hasMatchingDocumentWater = await Water.exists({
      user: req.user.id,
      document: documentName,
    });
    const hasMatchingDocumentOfficial = await Official.exists({
      user: req.user.id,
      documentAccepted: documentName,
    });
    if (userFound.role.name === "citizen") {
      if (!hasMatchingDocumentWater && !hasMatchingDocumentOfficial)
        return res.status(401).json("Not found");
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
