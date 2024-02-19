import { Router } from "express";
import {
  login,
  logout,
  verifyToken,
  getUser,
  updatePassword,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, updatePasswordSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", authRequired, logout);
router.get("/user", authRequired, getUser);
router.post("/verify/:cookie", verifyToken);
router.post(
  "/updatepassword",
  authRequired,
  validateSchema(updatePasswordSchema),
  updatePassword
);

export default router;
