import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import {Routes, Route} from "react-router-dom";
import Userprofile from "./pages/Userprofile";
import Trips from "./pages/Trips";
import TripDetails from "./pages/TripDetails";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

export default function App() {
  return (
   
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<Userprofile />} />
        <Route path="/user" element={<Userprofile />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/tripdetails" element={<TripDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}
