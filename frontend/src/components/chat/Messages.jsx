import React, { useState, useEffect } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import io from "socket.io-client";
  import axios from "axios";
const socket = io("http://localhost:3000");

const Messages = ({ userToChatId, token }) => {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  



  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/messages/conversation/${conversationId}`,
          {
            withCredentials: true,
          }
        );
  
        console.log('Messages:', response.data);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    setConversationId(userToChatId);
    fetchMessages();
  }, [conversationId]);

  console.log('messages.jsx:', userToChatId)

  useEffect(() => {
    console.log('Messages component - userToChatId:', userToChatId);
  
    socket.emit('joinRoom', { room: userToChatId });

   
  
    socket.on('message', (newMessage) => {
      console.log('Messages component - new message:', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  
    return () => {
      console.log('Messages component - leaving room:', userToChatId);
      socket.emit('leaveRoom', { room: userToChatId });
    };
  }, [userToChatId, setMessages]);

  const handleSendMessage = (newMessage) => {
    socket.emit("sendMessage", { room: userToChatId, message: newMessage });
   // console.log('Token HandleSendMessage:', token)
  };

  console.log('Messages.jsx:', messages);

  return (
    <div className="flex flex-col h-full">
      <div className='px-4 flex-1 overflow-auto max-h-[550px]'>
      {messages.map((message) => (
  <Message key={message._id} message={message} />
)).length > 0 ? (
  <></>
) : (
  <p>No messages available.</p>
)}
      </div>
      <MessageInput userToChatId={userToChatId} onSendMessage={handleSendMessage} token={token}/>
    </div>
  );
};

export default Messages;