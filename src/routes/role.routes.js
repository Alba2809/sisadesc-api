import { Router } from "express";
import {
  getRoles,
} from "../controllers/role.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateRol } from "../middlewares/rol.middleware.js";

const router = Router();

router.get("/getroles", authRequired, validateRol("admin"), getRoles);

export default router;
