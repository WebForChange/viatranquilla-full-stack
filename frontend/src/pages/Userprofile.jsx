import React from "react";
import Profileheader from "../components/profilecomp/Profileheader";
import About from "../components/profilecomp/About";
import Usertrips from "../components/profilecomp/Usertrips";

function Userprofile() {
  return (
    <div className="flex flex-col w-full h-auto p-12">
      <Profileheader />
      <About />
      <Usertrips />
    </div>
  );
}

export default Userprofile;
