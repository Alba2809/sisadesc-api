import { deletefile } from "../libs/deletefile.js";

export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if(req.file) deletefile(req.file)
    return res
      .status(400)
      .json(error.errors.map((error) => error.message));
  }
};
