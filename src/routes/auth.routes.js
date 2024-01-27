import { Router } from "express";
import {
  login,
  logout,
  verifyToken,
  getUser
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", authRequired, logout);
router.get("/user", authRequired, getUser);
router.get("/verify", verifyToken);

export default router;
