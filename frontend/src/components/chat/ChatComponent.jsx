import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { ChatContext } from "../../contexts/ChatContextProvider";


const ChatComponent = ({ username }) => {
  const { socket, user } = useContext(ChatContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  
  

  useEffect(() => {
    console.log("Component mounted");
    const handleChatMessage = (msg) => {
        console.log("Message received:", msg);
        setMessages((prevMessages) => [...prevMessages, msg]);
      };
  
    if (socket) {
      console.log("Adding event listener");
      socket.off("chat message", handleChatMessage);
      socket.on("chat message", handleChatMessage);
    }
  
    return () => {
      console.log("Component will unmount");
      if (socket) {
        console.log("Removing event listener");
        socket.off("chat message", handleChatMessage);
      }
    };
  }, [socket]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      
      socket.emit("chat message", {
        sender: user.username,
        message: messageInput,
      });

      
      setMessageInput("");
    }
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-transparent h-12 text-white font-bold py-2 px-4 rounded-full mb-4 border-2 border-solid border-sunset-400 hover:bg-sunset-400"
      >
        Message
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            width: "60%",
            height: "60%",
            margin: "auto",
            overflow: "auto",
          },
        }}
      >
        <h2>Chat with {username}</h2>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>
            <strong>{msg.sender}:</strong> {msg.message} 
          </div>
          ))}
        </div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default ChatComponent;