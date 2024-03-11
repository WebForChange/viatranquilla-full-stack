import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
export const AuthContext = createContext();

/*
    This component is a provider for the AuthContext. It is responsible for checking if the user is 
    logged in and setting the user state accordingly. It also provides the checkLoggedIn function to 
    the context, which can be used to check if the user is logged in at any time.

    Due to issues with the loggedIn state not updating properly, I have added a useEffect to log the 
    user and loggedIn state whenever they change. 
    It should be fixed by now, but i leave it here to help debug the issue if it shows up again.
*/

export default function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  //   console.log("AuthContext running");
  //   console.log("logged in: ", loggedIn);
  //   console.log("user: ", user);

  const checkLoggedIn = async () => {
    console.log("checkLoggedIn running");
    try {
      const response = await axios.get("http://localhost:3000/auth/me", {
        withCredentials: true,
      });
      if (response.data) {
        // console.log("CheckLoggedIn response.data is true");
        // console.log(token);
        // setToken(localStorage.getItem("token"));
        setLoggedIn(true);
        setUser(response.data);
      } else {
        // console.log("checkLoggedIn.response.data is false");
        setLoggedIn(false);
        setUser({});
      }
    } catch (error) {
      console.error(error);
      setLoggedIn(false);
      setUser({});
    }
  };

  useEffect(() => {
    // console.log("useEffect running in AuthProvider.jsx");
    const token = Cookies.get("token");
    if (token) {
      checkLoggedIn();
    } else {
      console.log("NoToken!!!!");
    }
  }, []);

  useEffect(() => {
    // console.log("Debug useEffect running in AuthProvider.jsx");
    // console.log(user, loggedIn);
  }, [loggedIn]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loggedIn, setLoggedIn, checkLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}
