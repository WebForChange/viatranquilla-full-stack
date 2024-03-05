import React from "react";


const Message = ({ message }) => {
  console.log("Message.jsx - message:", message);

  
  console.log("Message.jsx:", message);
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        {/* <div className="w-10 rounded-full">
          <img src={message.sender.profilePicture} alt="user avatar" />
        </div> */}
      </div>

      <div className="chat-bubble text-white bg-black bg-opacity-25 border border-dmidnight_green-200">
        {message.message}
      </div>
      <div className="chat-footer text-xs text-dmidnight_green3-600">
        {message.timestamp}
      </div>
    </div>
  );
};

export default Message;
