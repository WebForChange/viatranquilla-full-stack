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
        className=" border-delft_blue-700 rounded p-1 w-3/4 placeholder-delft_blue-900"
        placeholder="Type your message..."
      />
      <button
        className=" bg-delft_blue-500 rounded p-1 "
        onClick={handleSendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
