import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import verifyToken from "../middlewares/verifyToken.js";
import mongoose from "mongoose";

export const sendMessage = async (req, res) => {
  const decoded = req.user;
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const userToChatId = receiverId; // Assign userToChatId here
    const senderId = decoded.userId; // Get the sender's id from the request user object
    console.log("userToChatId:", userToChatId);
    console.log("senderId:", senderId);
    // Find the conversation between the sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // If the conversation does not exist, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        _id: new mongoose.Types.ObjectId(userToChatId),
        participants: [senderId, receiverId],
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderId: decoded.userId,
      receiverId: userToChatId,
      message,
    });

    // Save the message
    if (newMessage) {
      conversation.messages.push(newMessage._id);
      newMessage.save();
      conversation.save();
    }

    console.log("New Message:", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
};

export const getMessages = async (req, res) => {
  try {
    // Get the receiver's id from the request parameters
    const { id: userToChatId } = req.params;

    // Get the sender's id from the request user object
    const senderId = req.user ? req.user._id : null;

    console.log("Receiver ID:", userToChatId);
    console.log("Sender ID:", senderId);

    // Find the conversation between the sender and receiver
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    // If the conversation does not exist, return an empty array
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const messages = conversation.messages;

    // If the conversation does exist, return the messages
    res.status(200).json(messages);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
};

export const getConversations = async (req, res) => {
  const decoded = req.user;
  try {
    // Get the user's id from the request user object
    const userId = decoded.userId;

    // Find all conversations where the user is a participant
    const conversations = await Conversation.find({
      participants: userId,
    }).populate("messages");

    // If the conversations do not exist, return an empty array
    if (!conversations) {
      return res.status(404).json({ message: "Conversations not found" });
    }

    // If the conversations do exist, return the conversations
    res.status(200).json(conversations);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
};

export const getMessagesInConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    // Check if conversationId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({ message: 'Invalid conversationId' });
    }

    const conversation = await Conversation.findById(conversationId).populate('messages');

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
};