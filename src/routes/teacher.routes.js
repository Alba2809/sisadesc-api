import { Router } from "express";
import {
  registerTeacher,
  updateTeacher,
  getTeacher,
  getTeachers,
  deleteTeacher,
} from "../controllers/teacher.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { validateRol } from "../middlewares/rol.middleware.js";
import {
  teacherSchema,
} from "../schemas/admin.schema.js";

const router = Router();

router.post(
  "/registerteacher",
  authRequired,
  validateRol(["admin", "secretary"]),
  validateSchema(teacherSchema),
  registerTeacher
);
router.put(
  "/updateteacher/:id",
  authRequired,
  validateRol(["admin", "secretary"]),
  validateSchema(teacherSchema),
  updateTeacher
);
router.get(
  "/getteacher/:id",
  authRequired,
  validateRol(["admin", "secretary"]),
  getTeacher
);
router.get(
  "/getteachers",
  authRequired,
  validateRol(["admin", "secretary"]),
  getTeachers
);
router.delete(
  "/deleteteacher/:id",
  authRequired,
  validateRol(["admin", "secretary"]),
  deleteTeacher
);

export default router;
