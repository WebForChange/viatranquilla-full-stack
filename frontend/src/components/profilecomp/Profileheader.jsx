import React, { useEffect, useState, useContext, memo } from "react";
import { Link, useParams } from "react-router-dom";
import {DataContext} from "../../contexts/DataContextProvider";
import { AuthContext } from "../../contexts/AuthProvider";
import Modal from "react-modal";
import MessageContainer from "../chat/MessageContainer";
Modal.setAppElement("#root");



function Profileheader() {
  const { getProfileDataByID, profileData } = useContext(DataContext);
  const { username } = useParams();
  const { user } = useContext(AuthContext);

  const loggedInUsername = user.username;
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getProfileDataByID(`${username}`);
  }, [username]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row-reverse justify-around items-center text-white">
        <div className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/250"
            alt="profile"
            className="rounded-full h-24 w-24 lg:w-48 lg:h-48 mb-4"
          />
          <button className="bg-sunset-400 hover:bg-sunset-500 text-white font-bold py-2 px-4 rounded-full mb-4"><Link to={`/user/edit/${loggedInUsername}`}>Edit Profile</Link></button>
          
            
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-5xl lg:text-8xl font-bold mb-4 bg-gradient-to-br from-cambridge_blue-400 to-delft_blue-700 bg-clip-text text-transparent uppercase">
            {username}
          </h1>
          <div className="flex justify-center w-full space-x-4">
            <button className="bg-transparent text-white font-bold py-2 px-4 rounded-full mb-4 border-2 border-solid border-sunset-400 h-12 hover:bg-sunset-400">
              Add friend
            </button>
            <button
              onClick={openModal}
              className="bg-transparent text-white font-bold py-2 px-4 rounded-full mb-4 border-2 border-solid border-sunset-400 h-12 hover:bg-sunset-400"
            >
              Message
            </button>

            {/* Use Modal component to conditionally render MessageContainer */}
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Message Modal"
              portalClassName="modal-portal"  // Add portalClassName
            >
              <MessageContainer username={loggedInUsername} participantUsername={username} />
              <button onClick={closeModal}>Close</button>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profileheader;
