import { Router } from "express";
import {
  registerParent,
  updateParent,
  getParent,
  getParents,
  deleteParent,
  registerOneParent,
} from "../controllers/parent.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { validateRol } from "../middlewares/rol.middleware.js";
import {
  fatherSchema,
  motherSchema,
  tutorSchema,
  parentSchema,
} from "../schemas/admin.schema.js";

const router = Router();

router.post(
  "/registerparent",
  authRequired,
  validateRol("admin"),
  validateSchema(parentSchema),
  registerOneParent
);
router.post(
  "/registerfather",
  authRequired,
  validateRol("admin"),
  validateSchema(fatherSchema),
  registerParent
);
router.post(
  "/registermother",
  authRequired,
  validateRol("admin"),
  validateSchema(motherSchema),
  registerParent
);
router.post(
  "/registertutor",
  authRequired,
  validateRol("admin"),
  validateSchema(tutorSchema),
  registerParent
);
router.put(
  "/updateparent/:id",
  authRequired,
  validateRol("admin"),
  validateSchema(parentSchema),
  updateParent
);
router.get("/getparent/:id", authRequired, validateRol("admin"), getParent);
router.get("/getparents", authRequired, validateRol("admin"), getParents);
router.delete(
  "/deleteparent/:id",
  authRequired,
  validateRol("admin"),
  deleteParent
);

export default router;