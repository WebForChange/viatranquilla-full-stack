import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/viatranquilla-logo.png";
import icon from "../assets/icon.png";
import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Search from "./shared/Search";

function Navbar() {
  const { user, loggedIn, setLoggedIn } = useContext(AuthContext);
  const username = user.username;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        { withCredentials: true }
      );
      console.log(data);
      setLoggedIn(false);
      navigate("/login");
      toast.success("You are logged out!");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <div>
      <div className="navbar bg-delft_blue-300">
        <div className="flex-1">
          <a href="/" className="text-3xl text-cambridge_blue-600 font-bold">
            <img
              src={icon}
              alt="via tranquilla logo"
              className="sm:w-96 w-1/2 sm:hidden"
            />
            <img
              src={logo}
              alt="via tranquilla logo"
              className="hidden sm:block sm:w-96"
            />
          </a>
        </div>
        <div className="flex-none gap-2 ">
          <div className="form-control">
            <Search />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Useravatar and menu"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-slate_gray-100 text-delft_blue-800 rounded-box w-52"
            >
              {loggedIn ? (
                <>
                  <li>
                    <Link to={"/dashboard/"} className="justify-between"> Dashboard </Link>
                  </li>
                  <li>
                    <Link to={"/user/" + username} className="justify-between"> Profile </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
