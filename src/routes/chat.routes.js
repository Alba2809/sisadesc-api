import { Router } from "express";
import {
  getUsersToChat,
  getMessages,
  sendMessage,
  getFileOfMessage,
} from "../controllers/chat.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateRol } from "../middlewares/rol.middleware.js";

const router = Router();

router.get("/getusers", authRequired, validateRol(["counselor", "parent"]), getUsersToChat);
router.post("/sendmessage/:id", authRequired, validateRol(["counselor", "parent"]), sendMessage);
router.get("/getmessages/:id", authRequired, validateRol(["counselor", "parent"]), getMessages);
router.get("/getFile/:id", authRequired, validateRol(["counselor", "parent"]), getFileOfMessage)

export default router;
