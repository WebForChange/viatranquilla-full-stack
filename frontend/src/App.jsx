import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import {Routes, Route} from "react-router-dom";
import Userprofile from "./pages/Userprofile";

export default function App() {
  return (
   
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Userprofile />} />
      </Routes>
    </div>
  )
}
