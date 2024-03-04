import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import googleButton from "../../assets/btn_google.png"

export default function LoginForm() {
  const { loggedIn, setLoggedIn, checkLoggedIn } = useContext(AuthContext);
  const [mailError, setMailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [postLogin, setPostLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setPostLogin({
      ...postLogin,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/auth/login",
        postLogin,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
      if (data.error === "email") {
        setMailError(true);
      } else {
        setMailError(false);
      }
      if (data.error === "password") {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
      if (data.token) {
        setLoggedIn(true);
        checkLoggedIn();
      }
    } catch (error) {
      console.error(error);
    }
  };

  function navigate(url){
    window.location.href = url
  }

  async function auth(){
    const response = await fetch('http://127.0.0.1:3000/request',{method:'post'});
    const data = await response.json();
    navigate(data.url);
  }

  return (
    <div className="text-eggshell-600 w-full h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-between items-center"
      >
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="p-1 rounded text-delft_blue-100"
            value={postLogin.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="p-1 rounded text-delft_blue-100"
            value={postLogin.password}
            onChange={handleChange}
          />
        </div>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <button
          type="submit"
          className="btn bg-cambridge_blue-400 border-none hover:bg-cambridge_blue-500"
        >
          Log in
        </button>
        <button type="button" onClick={() => auth()}><img src={googleButton} alt="google sign in"/></button>
        <p>
          <a href="">Forgot Password</a>
        </p>
      </form>
    </div>
  );
}
