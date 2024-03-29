import React from "react";
import Features from "../components/homecomp/Features";
import Hero from "../components/homecomp/Hero";
import { AuthContext } from "../contexts/AuthProvider";
import { useContext } from "react";

function Home() {
  const { loggedIn, user } = useContext(AuthContext);

  return (
    <div className="h-full">
      {/* Hero Section */}

      <Hero />

      {/* Features Section */}
      <div className="text-center my-4">
      <p className="text-1xl lg:text-2xl text-sunset-400 font-semibold">
        {loggedIn ? `Hello ${user.username}` : 'Hello Guest! Please '}
        {loggedIn ? null : <a href="/login">Login</a>} 
        {loggedIn ? null : ' or '}
        {loggedIn ? null :<a href="/register">Signup</a>}
      </p>
    </div>
      <h2 className="text-center text-4xl font-bold pt-8 text-sage-400">
        Features
      </h2>

      <Features />
      
    </div>
  );
}

export default Home;
