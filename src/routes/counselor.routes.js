import { Router } from "express";
import {
  createCounselor,
  getCounselor,
  getCounselors,
  updateCounselor,
  deleteCounselor
} from "../controllers/counselor.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateRol } from "../middlewares/rol.middleware.js";

const router = Router();

router.get("/", authRequired, validateRol(["admin", "viceprincipal"]), getCounselors);
router.get("/:id", authRequired, validateRol(["admin", "viceprincipal"]), getCounselor);
router.post("/", authRequired, validateRol(["admin", "viceprincipal"]), createCounselor);
router.put("/:id", authRequired, validateRol(["admin", "viceprincipal"]), updateCounselor);
router.delete("/:id", authRequired, validateRol(["admin", "viceprincipal"]), deleteCounselor);

export default router;
