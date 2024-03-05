import { Router } from "express";
import {
  deleteEvent,
  getEventByDate,
  getEventById,
  getEvents,
  registerEvent,
  updateEvent,
} from "../controllers/event.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { validateRol } from "../middlewares/rol.middleware.js";
import { eventSchema } from "../schemas/event.schema.js";

const router = Router();

router.post(
  "/registerevent",
  authRequired,
  validateRol(["academiccoor"]),
  validateSchema(eventSchema),
  registerEvent
);
router.get("/getevents", authRequired, getEvents);
router.get(
  "/geteventid/:id",
  authRequired,
  validateRol(["academiccoor"]),
  getEventById
);
router.get(
  "/geteventdate/:date",
  authRequired,
  validateRol(["academiccoor"]),
  getEventByDate
);
router.put(
  "/updateevent/:id",
  authRequired,
  validateRol(["academiccoor"]),
  validateSchema(eventSchema),
  updateEvent
);
router.delete(
  "/deleteevent/:id",
  authRequired,
  validateRol(["academiccoor"]),
  deleteEvent
);

export default router;
