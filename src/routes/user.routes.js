import { Router } from "express";
import {
  registerUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
} from "../controllers/user.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { validateRol } from "../middlewares/rol.middleware.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../schemas/admin.schema.js";
import multer from "multer";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/registeruser",
  authRequired,
  validateRol("admin"),
  validateSchema(createUserSchema),
  registerUser
);
router.put(
  "/updateuser/:id",
  authRequired,
  validateRol("admin"),
  upload.single("imageperfile"),
  validateSchema(updateUserSchema),
  updateUser
);
router.get("/getuser/:id", authRequired, validateRol(["admin", "viceprincipal"]), getUser);
router.get("/getusers", authRequired, validateRol("admin"), getUsers);
router.delete(
  "/deleteuser/:id",
  authRequired,
  validateRol("admin"),
  deleteUser
);

export default router;