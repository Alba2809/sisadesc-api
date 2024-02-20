import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { validateRol } from "./middlewares/rol.middleware.js";
import { validateDocument } from "./middlewares/document.middleware.js";
import { authRequired } from "./middlewares/validateToken.js";
import { createRoles, createUsers } from "./libs/initialSetup.js";
import { FRONTEND_URL } from "./config.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import chatRoutes from "./routes/chat.routes.js";

const app = express();
createRoles();
createUsers();

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

/* app.use("/public/images", express.static(join(__dirname, "public/images")));
app.use(
  "/public/documentos",
  authRequired,
  validateRol(["employee.dw", "employee.op", "citizen"]),
  validateDocument(),
  express.static(join(__dirname, "public/documents"))
);
 */
app.use("/api", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherRoutes)
app.use("/api/chat", chatRoutes);

export default app;
