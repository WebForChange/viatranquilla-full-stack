import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import {DataContext} from "../../contexts/DataContextProvider";
import { AuthContext } from "../../contexts/AuthProvider";

function Profileheader() {
  const { getProfileDataByID, profileData } = useContext(DataContext);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const username = user.username;

  useEffect(() => {
    getProfileDataByID(`${id}`);
  }, [id]);

  console.log(profileData);

  return (
    <div>
      <div className="flex flex-col lg:flex-row-reverse justify-around items-center text-white">
        <div className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/250"
            alt="profile"
            className="rounded-full h-24 w-24 lg:w-48 lg:h-48 mb-4"
          />
          <button className="bg-sunset-400 hover:bg-sunset-500 text-white font-bold py-2 px-4 rounded-full mb-4"><Link to={`/user/edit/${username}`}>Edit Profile</Link></button>
            
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-5xl lg:text-8xl font-bold mb-4 bg-gradient-to-br from-cambridge_blue-400 to-delft_blue-700 bg-clip-text text-transparent uppercase">
            {username}
          </h1>
          <div className="flex justify-center w-full space-x-4">
            <button className="bg-transparent text-white font-bold py-2 px-4 rounded-full mb-4 border-2 border-solid border-sunset-400 h-12 hover:bg-sunset-400">
              Add friend
            </button>
            <button className="bg-transparent h-12 text-white font-bold py-2 px-4 rounded-full mb-4 border-2 border-solid border-sunset-400 hover:bg-sunset-400">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profileheader;
