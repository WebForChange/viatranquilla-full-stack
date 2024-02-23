import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
const DataContext = createContext();

export default function DataContext({children}) {
    const [profileData, setProfileData] = useState({});
    const [allUser, setAllList] = useState([]);

    function getProfileDataByID(id) {
        axios.get(`http://localhost:3000/profile/${id}`)
        .then((response) => {
            setProfileData(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }
    // Get all user as a list of IDs - route is not implemented yet so it is not defined here and will not work :(
    function getAllUser() {
        axios.get(`http://localhost:3000/`)
        .then((response) => {
            setAllList(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }



    return (
        <DataContext.Provider value=
        {{
            profileData,
            allUser, 
            getProfileDataByID,
            getProfileDataByID
        }}>
            {children}
        </DataContext.Provider>
    )

}