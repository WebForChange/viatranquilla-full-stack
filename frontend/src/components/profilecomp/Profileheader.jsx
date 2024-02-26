import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {DataContext} from "../../contexts/DataContextProvider";

function Profileheader() {
  const { getProfileDataByID, profileData } = useContext(DataContext);
  const { id } = useParams();

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
          <button className="bg-sunset-400 hover:bg-sunset-500 text-white font-bold py-2 px-4 rounded-full mb-4">
            Edit Profile
          </button>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-5xl lg:text-8xl font-bold mb-4 text-sunset-400">
            {profileData?.username}
          </h1>
          <div className="flex justify-between w-full space-x-4">
            <button className="bg-transparent text-white font-bold py-2 px-4 rounded-full mb-4 border-2 border-solid border-sunset-400 h-12">
              Add friend
            </button>
            <button className="bg-transparent h-12 text-white font-bold py-2 px-4 rounded-full mb-4 border-2 border-solid border-sunset-400">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profileheader;
