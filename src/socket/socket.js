import { Server } from "socket.io";
import { FRONTEND_URL } from "../config.js";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("New connection", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  /* io.emit is used to send events to all the connected clients */
  /* io.emit("users", Object.keys(userSocketMap)) */

  socket.on("disconnect", () => {
    console.log("Connection closed", socket.id);
    delete userSocketMap[userId];
  });

  socket.on("message", (data) => {
    console.log("New message", data);
    io.emit("message", data);
  });

  socket.on("post", (data) => {
    console.log("New post", data);
    io.emit("post", data);
  });
});

export { app, io, server };
