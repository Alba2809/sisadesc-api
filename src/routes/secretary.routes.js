import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { validateRol } from "../middlewares/rol.middleware.js";
import {
  deletePost,
  getGrades,
  getPost,
  getPosts,
  getSubjectStudents,
  getSubjects,
  registerGrades,
  registerPost,
  updateGrades,
  updatePost,
} from "../controllers/secretary.controller.js";
import { postSchema } from "../schemas/secretary.schema.js";

const router = Router();

router.get("/subjects", authRequired, validateRol("secretary"), getSubjects);
router.get(
  "/subjects/:id",
  authRequired,
  validateRol("secretary"),
  getSubjectStudents
);

router.get("/grades/:id", authRequired, validateRol("secretary"), getGrades);
router.post("/grades", authRequired, validateRol("secretary"), registerGrades);
router.put("/grades", authRequired, validateRol("secretary"), updateGrades);

router.get("/posts", authRequired, validateRol("secretary"), getPosts);
router.get("/posts/:id", authRequired, validateRol("secretary"), getPost);
router.post(
  "/posts",
  authRequired,
  validateRol("secretary"),
  validateSchema(postSchema),
  registerPost
);
router.put(
  "/posts/:id",
  authRequired,
  validateRol("secretary"),
  validateSchema(postSchema),
  updatePost
);
router.delete("/posts/:id", authRequired, validateRol("secretary"), deletePost);

export default router;
