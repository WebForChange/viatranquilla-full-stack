import express from "express";
import { createChat, getChats, getChatMessages, sendMessage } from "../controllers/chatController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createChat);
router.get("/", verifyToken, getChats);
router.get("/:username/messages", verifyToken, getChatMessages);
router.get("/:chatId/messages", verifyToken, getChatMessages);
router.post("/:chatId/messages", verifyToken, sendMessage);

export default router;