import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import {Routes, Route} from "react-router-dom";
import Userprofile from "./pages/Userprofile";
import TripDetails from "./pages/TripDetails";

export default function App() {
  return (
   
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Userprofile />} />
        <Route path="/tripdetails" element={<TripDetails />} />
      </Routes>
    </div>
  )
}
