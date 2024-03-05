import { Router } from "express";
import { getAddresses } from "../controllers/address.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get(
  "/getaddresses",
  authRequired,
  getAddresses
);

export default router;
