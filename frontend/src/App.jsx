import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Userprofile from "./pages/Userprofile";
import Dashboard from "./pages/Dashboard";
import TripDetails from "./pages/TripDetails";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ProfileForm from "./components/forms/ProfileForm";
import Footer from "./Footer";
import NotFound from "./components/shared/NotFound";
import Tripform from "./components/forms/TripForm";
import CarForm from "./components/forms/CarForm";
import ItemForm from "./components/forms/ItemForm";
import { useParams } from "react-router-dom";
import OAuthMessage from "./components/shared/OAuthMessage";
import OAuthDuplicateError from "./components/shared/DuplicateError";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const { username } = useParams();
  return (
    <div className="">
      <Navbar />
      <ToastContainer
      position="top-center"
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover={false}
      theme="light"
      transition: Flip
      autoClose={5000}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<Userprofile />} />
        <Route path="/user" element={<Userprofile />} />
        <Route path="/user/edit/:id" element={<ProfileForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tripdetails" element={<TripDetails />} />
        <Route path="/tripdetails/:_id" element={<TripDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/newtrip" element={<Tripform />} />
        <Route path="/newitem" element={<ItemForm />} />
        <Route path="/newvehicle/" element={<CarForm />} />
        <Route path="/items/edit/:_id" element={<ItemForm />} />
        <Route path="/edit-vehicle/" element={<CarForm />} />
        <Route path="/oauthmessage" element={<OAuthMessage />} />
        <Route path="/duplicateerror" element={<OAuthDuplicateError />} />
        <Route path="*" element={<NotFound error="Page not found" />} />
      </Routes>
      <Footer />
    </div>
  );
}
