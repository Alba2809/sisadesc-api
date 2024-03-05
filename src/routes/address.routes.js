import { Router } from "express";
import { getAddresses } from "../controllers/address.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateRol } from "../middlewares/rol.middleware.js";

const router = Router();

router.get(
  "/getaddresses",
  authRequired,
  validateRol(["admin", "secretary"]),
  getAddresses
);

export default router;
