import express from "express";
import { sendMessage, getMessages, getConversations, getMessagesInConversation } from "../controllers/chatController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/:id", verifyToken, getMessages);
router.post("/send/:id", verifyToken, sendMessage);
router.get("/conversation", verifyToken, getConversations);
router.get('/conversation/:conversationId', verifyToken, getMessagesInConversation);

export default router;
