import { Router } from "express";
import {
  registerSubject,
  updateSubject,
  getSubject,
  getSubjects,
  deleteSubject,
  getSubjectStudents,
  updateStatusSubject,
  getSubjectsOfTeacher
} from "../controllers/subject.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { validateRol } from "../middlewares/rol.middleware.js";
import {
  subjectSchema,
} from "../schemas/admin.schema.js";

const router = Router();

router.post(
  "/registersubject",
  authRequired,
  validateRol("admin"),
  validateSchema(subjectSchema),
  registerSubject
);
router.put(
  "/updatesubject/:id",
  authRequired,
  validateRol("admin"),
  validateSchema(subjectSchema),
  updateSubject
);
router.put(
  "/updatestatussubject/:id",
  authRequired,
  validateRol("admin"),
  updateStatusSubject
);
router.get("/getsubject/:id", authRequired, validateRol(["admin", "secretary"]), getSubject);
router.get("/getsubjects", authRequired, validateRol(["admin", "secretary"]), getSubjects);
router.get("/getsubjectsOfTeacher", authRequired, validateRol("teacher"), getSubjectsOfTeacher);
router.get(
  "/getsubjectstudents/:id",
  authRequired,
  validateRol(["admin", "secretary", "teacher"]),
  getSubjectStudents
);
router.delete(
  "/admin/deletesubject/:id",
  authRequired,
  validateRol(["admin", "secretary"]),
  deleteSubject
);

export default router;
