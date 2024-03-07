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
import oAuth from "./src/utils/oAuth.js";
import oAuthRequest from "./src/utils/oAuthRequest.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import pusherInstance from "./src/middlewares/pusher.js";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/messages", chatRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/trips", tripRoutes);
app.use("/preferences", preferencesRoutes);
app.use("/oauth", oAuth);
app.use("/request", oAuthRequest);

app.use(errorHandler);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
