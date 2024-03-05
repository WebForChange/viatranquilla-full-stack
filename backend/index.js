import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import tripRoutes from "./src/routes/tripRoutes.js";
import chatRoutes from "./src/routes/chatRoutes.js";
import preferencesRoutes from "./src/routes/preferencesRoutes.js";
import { errorHandler } from "./src/middlewares/ErrorHandler.js";
import "./src/db/server.js";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import oAuth from "./src/routes/oAuth.js"
import oAuthRoutes from "./src/routes/oAuthRoute.js"
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const users = {};

const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());



io.on("connection", (socket) => {
  console.log("Connected", socket.id);

  socket.on("disconnect", () => {
    console.log("Disconnected");
    // Remove disconnected user from the users object
    for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
  });

  // socket.io private messaging
  socket.on("privateMessage", ({ targetUserId, message }) => {
    const targetSocket = users[targetUserId];
    console.log("Target Socket:", targetSocket);
    if (targetSocket) {
      io.to(targetSocket).emit("privateMessage", {
        message,
        senderId: socket.id,
      });
    }
  });

  socket.on("sendMessage", ({ room, message }) => {
    console.log("Message received:", message);
    io.to(room).emit("message", message);
  });


  // socket.io group messaging
  socket.on("groupMessage", ({ groupId, message }) => {
    io.to(groupId).emit("groupMessage", {
      message,
      senderId: socket.id,
    });
  });
});

app.use("/messages", chatRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/trips", tripRoutes);
app.use("/preferences", preferencesRoutes);
app.use("/oauth", oAuth);
app.use("/request", oAuthRoutes);

app.use(errorHandler);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
