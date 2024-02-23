import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
const DataContext = createContext();

export default function DataContext({children}) {
    const [profileData, setProfileData] = useState({});
    const [allUser, setAllList] = useState([]);

    // Get profile data by User-ID. Do not send sensitive non display data like password - route is not implemented yet so it is not defined here and will not work :(
    async function getProfileDataByID(id) {
        try {
            const response = await axios.get(`http://localhost:3000/profile/${id}`);
            setProfileData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    // Get all user as a list of IDs with username and profilePicture - route is not implemented yet so it is not defined here and will not work :(
        async function getAllUser() {
            try {
                const response = await axios.get(`http://localhost:3000/`);
                setAllList(response.data);
            } catch (error) {
                console.error(error);
            }
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