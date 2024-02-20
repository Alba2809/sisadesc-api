import { Router } from "express";
import {
  getUsersToChat,
  getMessages,
  sendMessage
} from "../controllers/chat.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateRol } from "../middlewares/rol.middleware.js";

const router = Router();

router.get("/getusers", authRequired, validateRol(["teacher", "admin"]), getUsersToChat);
router.post("/sendmessage/:id", authRequired, validateRol(["teacher", "admin"]), sendMessage);
router.get("/getmessages/:id", authRequired, validateRol(["teacher", "admin"]), getMessages);

export default router;
