import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";


const createChat = async (req, res, next) => {
  try {
    const { participantUsername } = req.body;
        
    const currentUser = await User.findOne({ username: req.user.username });

    const participantUser = await User.findOne({ username: participantUsername });

        const existingChat = await Chat.findOne({
      participants: { $all: [currentUser._id, participantUser._id] }
    });

    if (existingChat) {
      return res.status(400).json({ message: "Chat already exists" });
    }

    // Create a new chat
    const newChat = new Chat({
      participants: [currentUser._id, participantUser._id],
      messages: []
    });

    await newChat.save();

    res.status(201).json(newChat);
  } catch (error) {
    next(error);
  }
};

const getChats = async (req, res, next) => {
  try {
    const currentUser = await User.findOne({ username: req.user.username });

    const chats = await Chat.find({ participants: currentUser._id })
      .populate("participants", "username")
      .select("-messages");

    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
};

const getChatMessages = async (req, res, next) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId)
      .populate("participants", "username")
      .populate("messages.sender", "username")
      .select("messages");

    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};

const sendMessage = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { message } = req.body;

    const currentUser = await User.findOne({ username: req.user.username });

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: {
          messages: {
            sender: currentUser.username,
            message,
            timestamp: new Date()
          }
        }
      },
      { new: true }
    )
      .populate("participants", "username")
      .populate("messages.sender", "username")
      .select("messages");

    // Emit the message to clients
    io.to(chatId).emit("chat message", {
      sender: currentUser.username,
      message,
    });

    res.status(200).json(updatedChat);
  } catch (error) {
    next(error);
  }
};

export { createChat, getChats, getChatMessages, sendMessage };