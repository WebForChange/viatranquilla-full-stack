import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import mongoose from "mongoose";
import pusherInstance from "../middlewares/pusher.js";

import verifyToken from "../middlewares/verifyToken.js";

export const sendMessage = async (req, res) => {
  const decoded = req.user;
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const userToChatId = receiverId;
    const senderId = decoded.userId;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        _id: new mongoose.Types.ObjectId(userToChatId),
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      sender: senderId,
      receiver: userToChatId,
      senderId: decoded.userId,
      receiverId: userToChatId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      newMessage.save();
      conversation.save();

      // Emit the new message using Pusher
      pusherInstance.trigger(`chat_${userToChatId}`, "new_message", {
        message: newMessage,
      });
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
};

export const getMessages = async (req, res) => {
  const decoded = req.user;

  try {
    const { senderId, receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    })
      .populate('sender', 'username') 
      .populate('receiver', 'username') 
      .sort({ createdAt: 'asc' });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
};

export const getConversations = async (req, res) => {
  const decoded = req.user;
  try {
    const userId = decoded.userId;

    const conversations = await Conversation.find({
      participants: userId,
    }).populate("messages");

    if (!conversations) {
      return res.status(404).json({ message: "Conversations not found" });
    }

    res.status(200).json(conversations);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
};

export const getMessagesInConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({ message: "Invalid conversationId" });
    }

    const conversation = await Conversation.findById(conversationId).populate(
      "messages"
    );

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
};
