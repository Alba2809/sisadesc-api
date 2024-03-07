import { Router } from "express";
import {
  getUsersToChat,
  getMessages,
  sendMessage,
  getFileOfMessage,
} from "../controllers/chat.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateRol } from "../middlewares/rol.middleware.js";
import multer from "multer";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/getusers", authRequired, validateRol(["teacher", "admin"]), getUsersToChat);
router.post("/sendmessage/:id", authRequired, validateRol(["teacher", "admin"])/* , upload.single("fileChat") */, sendMessage);
router.get("/getmessages/:id", authRequired, validateRol(["teacher", "admin"]), getMessages);
router.get("/getFile/:id", authRequired, validateRol(["teacher", "admin"]), getFileOfMessage)

export default router;
