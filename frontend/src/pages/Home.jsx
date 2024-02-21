import React from "react";
import Features from "../components/homecomp/Features";
import Hero from "../components/homecomp/Hero";

function Home() {
  return (
    <div>
      {/* Hero Section */}

      <Hero />

      {/* Features Section */}
      <h2 className="text-center text-4xl font-bold pt-8 text-sage-400">
        Features
      </h2>

      <Features />
      <Features />
    </div>
  );
}

export default Home;
