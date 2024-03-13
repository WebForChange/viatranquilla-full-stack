import React from "react";
import UserProfile from "../../pages/Userprofile";

const MessageContainer = ({}) => {
  return (
    <div className="bg-bg-delft_blue-300">
      {users.map((user) => (
        <UserProfile
          key={user.userId}
          userId={user.userId}
          username={user.username}
        />
      ))}
    </div>
  );
};

export default MessageContainer;
