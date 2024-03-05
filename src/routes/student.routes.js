import { Router } from "express";
import {
  registerStudent,
  updateStudent,
  getStudent,
  getStudents,
  deleteStudent,
} from "../controllers/student.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { validateRol } from "../middlewares/rol.middleware.js";
import {
  studentSchema,
} from "../schemas/admin.schema.js";

const router = Router();

router.post(
  "/registerstudent",
  authRequired,
  validateRol("admin"),
  validateSchema(studentSchema),
  registerStudent
);
router.put(
  "/updatestudent/:id",
  authRequired,
  validateRol("admin"),
  validateSchema(studentSchema),
  updateStudent
);
router.get("/getstudent/:id", authRequired, validateRol("admin"), getStudent);
router.get("/getstudents", authRequired, validateRol(["admin", "viceprincipal"]), getStudents);
router.delete(
  "/deletestudent/:id",
  authRequired,
  validateRol("admin"),
  deleteStudent
);

export default router;
