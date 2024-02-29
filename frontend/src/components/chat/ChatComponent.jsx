import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { ChatContext } from "../../contexts/ChatContextProvider";
import { DataContext } from "../../contexts/DataContextProvider";
import axios from "axios";

const ChatComponent = ({ username }) => {
  const { socket, user, chatId, setChatId } = useContext(ChatContext);
  const { profileData } = useContext(DataContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const participantUsername = profileData.username;

  console.log("ChatComponent user:", user.username);
  console.log("ChatComponent chatId:", chatId);
  console.log("ChatComponent participantUsername:", participantUsername);
  const createChatFunction = async (participantUsername) => {
    try {
      const response = await axios.post("http://localhost:3000/chat", {
        participantUsername,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const createChat = async () => {
    try {
      const response = await createChatFunction(participantUsername);
      setChatId(response.chatId);
      openModal();
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const handleOpenChat = async () => {
    if (chatId === null) {
      // If chatId is null, create a new chat
      await createChat();
    } else {
      // If chatId is not null, open the existing chat modal
      openModal();
    }
  };

  useEffect(() => {
    const handleChatMessage = (msg) => {
     
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    if (socket) {
      socket.off("chat message", handleChatMessage);
      socket.on("chat message", handleChatMessage);
    }

    return () => {
     if (socket) {
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
        chatId,
        timestamp: new Date(),
      });

      setMessageInput("");
    }
  };

  return (
    <div>
      <button
        onClick={handleOpenChat}
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
        <h2 className="text-center">You chat with {participantUsername}</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 m-1 rounded ${
                msg.sender === user.username
                  ? "bg-delft_blue-500 text-right " // Sent message color, right align
                  : "bg-cambridge_blue-500 text-left" // Received message color, left align
              } bg-opacity-40`}
            >
              <strong>{msg.sender}:</strong> {msg.message}{" "}
              <p className="text-[0.6em] opacity-40">
                {msg.timestamp
                  ? new Date(msg.timestamp).toLocaleTimeString()
                  : ""}
              </p>
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
          <button className="btn" onClick={sendMessage}>
            Send Message
          </button>
          <button className="btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ChatComponent;
