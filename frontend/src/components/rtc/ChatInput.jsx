import React, { useState } from "react";

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    onSendMessage(message);
    setMessage("");
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button className=" bg-slate_gray-600 rounded p-1 " onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatInput;