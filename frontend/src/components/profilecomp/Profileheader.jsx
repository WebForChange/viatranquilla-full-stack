import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../../contexts/DataContextProvider";
import { AuthContext } from "../../contexts/AuthProvider";
import Modal from "react-modal";
import { toast } from "react-toastify";
import ChatModal from "../rtc/ChatModal"; // Import the ChatModal component
Modal.setAppElement("#root");

function ProfileHeader() {
  const { getProfileDataByID, profileData, addFriend } =
    useContext(DataContext);
  const { user } = useContext(AuthContext);
  const { username } = useParams();

  const loggedInUser = user;
  const [showChatModal, setShowChatModal] = useState(false);

  useEffect(() => {
    getProfileDataByID(username);
  }, [username]);

  const handleChatButtonClick = () => {
    setShowChatModal(true);
  };

  const handleCloseChatModal = () => {
    setShowChatModal(false);
  };

  const handleAddFriend = () => {
    console.log(`Add friend ${username}`);
    addFriend(username);
    toast.success("Your friend request has been sent!");
  };

  return (
    <div>
      <div className="flex flex-col-reverse lg:flex-row-reverse justify-end items-center text-white lg:m-10">
        <div className="flex flex-col items-center mx-8">
          <h1 className="text-5xl lg:text-8xl font-bold mb-4 bg-gradient-to-br from-cambridge_blue-400 to-delft_blue-700 bg-clip-text text-transparent uppercase">
            {profileData.username}
          </h1>
          <div className="flex justify-center w-full space-x-4">
            <button
              onClick={handleAddFriend}
              className="bg-transparent text-white font-bold py-2 px-4 rounded-full mb-4 border-2 border-solid border-sunset-400 h-12 hover:bg-sunset-400"
            >
              <p className="inline">Add</p>
              <p className="hidden sm:inline"> friend</p>
            </button>
            <button
              onClick={handleChatButtonClick}
              className="bg-transparent text-white font-bold py-2 px-4 rounded-full mb-4 border-2 border-solid border-sunset-400 h-12 hover:bg-sunset-400"
            >
              Message
            </button>
            {showChatModal && (
              <ChatModal
                userId={profileData._id}
                onClose={handleCloseChatModal}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col items-center mx-8">
          <img
            src={profileData.profilePicture}
            alt="profile"
            className="rounded-full h-24 w-24 lg:w-48 lg:h-48 mb-4"
          />
          <button className="bg-sunset-400 hover:bg-sunset-500 text-white font-bold py-2 px-4 rounded-full mb-4">
            <Link to={`/user/edit/${loggedInUser.username}`}>Edit Profile</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
