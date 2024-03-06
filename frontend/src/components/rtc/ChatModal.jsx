import React, { useState, useEffect, useContext } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { fetchMessages, sendMessage } from "./chatService";
import { AuthContext } from "../../contexts/AuthProvider";
import { DataContext } from "../../contexts/DataContextProvider";
import './ChatModal.css';


const ChatModal = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
    const { getProfileDataByID, profileData } = useContext(DataContext);
    const userId = user._id;
    const receiverId = profileData._id;



    useEffect(() => {
        console.log('userId:', userId);
        console.log('receiverId:', receiverId);
        // Fetch initial messages for the conversation
        fetchMessages(userId, receiverId)
          .then((data) => {
            console.log('Fetched Messages:', data);
            setMessages(data);
          })
          .catch((error) => console.error('Error fetching messages:', error));
      }, [userId, receiverId]);

  const handleSendMessage = (message) => {
    // Send the message to the backend and update the state
    sendMessage(receiverId, message)
      .then((newMessage) => setMessages((prevMessages) => [...prevMessages, newMessage]))
      .catch((error) => console.error('Error sending message:', error));
  };

  return (
    <div className="ChatModalContainer">
      <div className="ChatModalHeader">
        <button onClick={onClose}>Close Chat</button>
      </div>
      <div className="ChatMessagesContainer">
        <ChatMessages messages={messages} />
      </div>
      <div className="ChatInputContainer">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatModal;