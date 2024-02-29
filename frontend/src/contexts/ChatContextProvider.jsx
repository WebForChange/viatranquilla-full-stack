import React, { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthProvider";

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    return () => newSocket.close();
  }, [user]);

console.log("ChatContextProvider user:", user.username);

  return (
    <ChatContext.Provider value={{ socket, user }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
