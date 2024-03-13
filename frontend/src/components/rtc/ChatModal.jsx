import React, { useState, useEffect, useContext } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { fetchMessages, sendMessage } from "./chatService";
import { AuthContext } from "../../contexts/AuthProvider";
import { DataContext } from "../../contexts/DataContextProvider";
import "./ChatModal.css";

const ChatModal = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  const { getProfileDataByID, profileData } = useContext(DataContext);
  const userId = user._id;
  const receiverId = profileData._id;

  useEffect(() => {
    console.log("userId:", userId);
    console.log("receiverId:", receiverId);
    // Fetch initial messages for the conversation
    fetchMessages(userId, receiverId)
      .then((data) => {
        console.log("Fetched Messages:", data);
        setMessages(data);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, [userId, receiverId]);

  const handleSendMessage = (message) => {
    // Send the message to the backend and update the state
    sendMessage(receiverId, message)
      .then((newMessage) =>
        setMessages((prevMessages) => [...prevMessages, newMessage])
      )
      .catch((error) => console.error("Error sending message:", error));
  };

  return (
    <div className="ChatModalContainer bg-delft_blue-300">
      <div className="ChatModalHeader bg-delft_blue-300">
        <button onClick={onClose} className="text-xl font-bold mr-2 text-white">
          x
        </button>
      </div>
      <div className="flex flex-col justify-end">
        <div className="ChatMessagesContainer flex ">
          <ChatMessages messages={messages} />
        </div>
        <div className="p-3">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
