import React from "react";
import UserProfile from '../../pages/Userprofile'

const MessageContainer = ({}) => {
  

  return (
    <div>
      {users.map((user) => (
        <UserProfile key={user.userId} userId={user.userId} username={user.username} />
      ))}
    </div>
  );
};

export default MessageContainer;