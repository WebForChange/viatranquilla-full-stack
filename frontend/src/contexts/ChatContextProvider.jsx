import React, { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthProvider";
import axios from "axios";

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    const storedChatId = localStorage.getItem("chatId");
    if (storedChatId) {
      setChatId(storedChatId);
    } else {
      // If not stored, generate a new one
      const newChatId = Math.floor(Math.random() * 1000);
      setChatId(newChatId);

      // Store the new chatId
      localStorage.setItem("chatId", newChatId);
    }

    return () => newSocket.close();
  }, [user.username, chatId]);

  const createChatFunction = async (participantUsername) => {
    try {
      const response = await axios.post("http://localhost:3000/chat", {
        participantUsername,
      });
  
      // Instead of returning only the chatId, return the whole response data
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  const createChat = async (participantUsername) => {
    try {
      const response = await createChatFunction(participantUsername);
  
      // Set the same chatId for both participants
      setChatId(response.chatId);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <ChatContext.Provider
      value={{ socket, user, chatId, setChatId, createChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
