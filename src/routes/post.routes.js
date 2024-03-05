import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { validateRol } from "../middlewares/rol.middleware.js";
import {
  deletePost,
  getPost,
  getPosts,
  registerPost,
  updatePost,
} from "../controllers/post.controller.js";
import { postSchema } from "../schemas/secretary.schema.js";

const router = Router();

router.get(
  "/posts",
  authRequired,
  getPosts
);
router.get(
  "/posts/:id",
  authRequired,
  validateRol(["secretary", "viceprincipal"]),
  getPost
);
router.post(
  "/posts",
  authRequired,
  validateRol(["secretary", "viceprincipal"]),
  validateSchema(postSchema),
  registerPost
);
router.put(
  "/posts/:id",
  authRequired,
  validateRol(["secretary", "viceprincipal"]),
  validateSchema(postSchema),
  updatePost
);
router.delete(
  "/posts/:id",
  authRequired,
  validateRol(["secretary", "viceprincipal"]),
  deletePost
);

export default router;