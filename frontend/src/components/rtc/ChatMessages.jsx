import React from "react";

const ChatMessages = ({ messages, userId }) => {
  return (
    <div>
      {messages.map((message, index) => (
        <div
          key={index}
          className={message.senderId === userId ? "sent" : "received"}
        >
          {message.message}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
