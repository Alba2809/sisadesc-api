import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { validateRol } from "../middlewares/rol.middleware.js";
import {
  getAssists,
  getGrades,
  getSubjects,
  registerAssists,
  registerGrades,
} from "../controllers/teacher.controller.js";

const router = Router();

router.get("/subjects", authRequired, validateRol("teacher"), getSubjects);
router.get("/assists/:id", authRequired, validateRol("teacher"), getAssists);
router.post(
  "/assists",
  authRequired,
  validateRol("teacher"),
  registerAssists
);
router.get("/grades/:id", authRequired, validateRol("teacher"), getGrades);
router.post("/grades", authRequired, validateRol("teacher"), registerGrades);

export default router;
