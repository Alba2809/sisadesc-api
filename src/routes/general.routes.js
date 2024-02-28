import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getPosts,
} from "../controllers/general.controller.js";

const router = Router();

router.get("/posts", authRequired, getPosts);

export default router;