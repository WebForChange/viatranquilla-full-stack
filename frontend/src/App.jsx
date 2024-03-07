import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Userprofile from "./pages/Userprofile";
import Trips from "./pages/Trips";
import TripDetails from "./pages/TripDetails";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ProfileForm from "./components/profile/ProfileForm";
import Footer from "./Footer";
import NotFound from "./components/shared/NotFound";
import Tripform from "./components/tripcomp/TripForm";
import { useParams } from "react-router-dom";

export default function App() {
 const { username } = useParams();
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<Userprofile />} />
        <Route path="/user" element={<Userprofile />} />
        <Route path="/user/edit/:id" element={<ProfileForm />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/tripdetails" element={<TripDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/newtrip" element={<Tripform />} />
        <Route path="*" element={<NotFound error="Page not found" />} />
      </Routes>
      <Footer />
    </div>
  );
}
