import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { validateRol } from "../middlewares/rol.middleware.js";
import {
  getGrades,
  getSubjectStudents,
  getSubjects,
} from "../controllers/teacher.controller.js";

const router = Router();

router.get("/subjects", authRequired, validateRol("teacher"), getSubjects);
router.get("/subjects/:id", authRequired, validateRol("teacher"), getSubjectStudents);
router.get("/grades/:id", authRequired, validateRol("teacher"), getGrades);

export default router;
