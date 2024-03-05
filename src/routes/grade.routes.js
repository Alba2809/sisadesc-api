import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateRol } from "../middlewares/rol.middleware.js";
import {
  getGrades,
  registerGrades,
  updateGrades,
} from "../controllers/grade.controller.js";

const router = Router();

router.get("/grades/:id", authRequired, validateRol(["secretary", "viceprincipal", "teacher", "principal"]), getGrades);
router.post("/grades", authRequired, validateRol(["secretary", "viceprincipal"]), registerGrades);
router.put("/grades", authRequired, validateRol(["secretary", "viceprincipal"]), updateGrades);

export default router;