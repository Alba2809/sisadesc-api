import { createRoles, createUsers } from "./libs/initialSetup.js";
import { FRONTEND_URL } from "./config.js";
import { app, server } from "./socket/socket.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import generalRoutes from "./routes/general.routes.js";
import addressRoutes from "./routes/address.routes.js"
import parentRoutes from "./routes/parent.routes.js"
import roleRoutes from "./routes/role.routes.js"
import teacherRoutes from "./routes/teacher.routes.js"
import userRoutes from "./routes/user.routes.js"
import studentRoutes from "./routes/student.routes.js"
import subjectRoutes from "./routes/subject.routes.js"
import gradeRoutes from "./routes/grade.routes.js"
import postRoutes from "./routes/post.routes.js"
import eventRoutes from "./routes/event.routes.js"

createRoles();
createUsers();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/user", userRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/grade", gradeRoutes);
app.use("/api/post", postRoutes);
app.use("/api/event", eventRoutes);
app.use("/api", generalRoutes);

export { app, server };
