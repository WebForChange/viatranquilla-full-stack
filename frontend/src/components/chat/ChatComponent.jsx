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
            backgroundColor: "rgba(0,0,0,0.8)",
            color: "white",
            display: "flex",
            flexDirection: "column", 
          },
        }}
      >
        <h2 className="text-center">You chat with {username}</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
    {messages.map((msg, index) => (
      <div
        key={index}
        className={`p-2 m-1 rounded ${
          msg.sender === user.username
            ? "bg-delft_blue-500 text-right " // Sent message color, right align
            : "bg-cambridge_blue-500 text-left" // Received message color, left align
        } bg-opacity-40`}
      >
        <strong>{msg.sender}:</strong> {msg.message}
      </div>
    ))}
  </div>
        <div style={{ marginTop: "auto" }}></div>
        <input
          type="text"
          className="bg-transparent border-delft_blue-800 border-2 rounded text-white "
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <div className="space-x-4 mt-2">
        <button className="btn" onClick={sendMessage}>Send Message</button>
        <button className="btn" onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default ChatComponent;
