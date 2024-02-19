import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { validateRol } from "../middlewares/rol.middleware.js";
import {
  getAssists,
  getSubjects,
  registerAssists,
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

export default router;
