import React,{ useContext, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { DataContext } from "../../contexts/DataContextProvider";
import { AuthContext } from "../../contexts/AuthProvider";

import ReactModal from "react-modal";



const MessageContainer = ({  }) => {
    const { profileData } = useContext(DataContext);
  const { token } = useContext(AuthContext);
    const userToChatId = profileData._id;
   const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    }
    const closeModal = () => {
        setModalIsOpen(false);
    }

    const handleModal = () => {
        if (modalIsOpen) {
            closeModal()
        } else {
            openModal()
        }
    }


    

    console.log('Container.jsx:', userToChatId);
    console.log(profileData);
  return (
    <div>
        
    <div className="md:min-w-[450px] lg:min-w-[550px] flex flex-col">
                <div className="px-4 py-2 mb-2">
            <span className="label-text">To:</span>
            <span className="text-white font-bold">{profileData.username}</span>
          </div>
          <Messages userToChatId={userToChatId} token={token} />
    
        
      
    </div></div>
  );
};



export default MessageContainer;
