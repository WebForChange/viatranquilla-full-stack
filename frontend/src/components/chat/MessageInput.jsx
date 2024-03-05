import React, { useState } from "react";
import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";



const MessageInput = ({ token, userToChatId, onSendMessage }) => {
  const [messageText, setMessageText] = useState("");
  const { user } = useContext(AuthContext);
  const senderId = user._id;


  //console.log("senderId:", senderId)
 // console.log("receiverId:", userToChatId)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Token before sending message:", token)
    try {
      const response = await axios.post(
        `http://localhost:3000/messages/send/${userToChatId}`,
        { message: messageText, senderId: senderId, receiverId: userToChatId 
          },
        {
           withCredentials: true,
        }
      );

      console.log("Message Text:", messageText);

      if (response.status === 204) {
        
        setMessageText("");
        onSendMessage();
      } else {
        console.error("Message send:", response.statusText);
      }
    } catch (error) {
      console.error("Error during message sending:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Type your message..."
        className="text-rose_taupe-100 bg-white border border-dmidnight_green-200 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-dmidnight_green-200 focus:border-transparent"
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;