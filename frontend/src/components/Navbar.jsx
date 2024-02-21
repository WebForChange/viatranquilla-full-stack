import React from "react";

function Navbar() {
  return (
    <div>
      <div className="navbar bg-delft_blue-300">
        <div className="flex-1">
          <a href="/" className="text-3xl text-cambridge_blue-600 font-bold">
            Via Tranquilla
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto bg-black bg-opacity-5 text-white shadow-lg shadow-slate_gray-100 rounded-full h-10"
            />
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
              <li>
                <a className="justify-between">
                  Profile
                 </a>
              </li>
              <li>
                <a>Your Trips</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;