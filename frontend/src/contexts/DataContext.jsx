import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
const DataContext = createContext();

export default function dataContext({children}) {
    const [profileData, setProfileData] = useState({});
    const [allUser, setAllList] = useState([]);
    const [tripDataFull, setTripDataFull] = useState([]);
    const [tripDataByID, setTripDataByID] = useState([]);
    const [tripDataByUser, setTripDataByUser] = useState([]);
    const [tripDataByQuery, setTripDataByQuery] = useState([]);

    // Get profile data by User-ID. Do not send sensitive non display data like password - route is not implemented yet so it is not defined here and will not work :(
        async function getProfileDataByID(id) {
            try {
                const response = await axios.get(`http://localhost:3000/profile/${id}`);
                setProfileData(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        async function getAllUser() {
            try {
                const response = await axios.get(`http://localhost:3000/users`);
                setAllList(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    // Get a full list of all stored trips - route is not implemented yet so it is not defined here and will not work :(
        async function getTripDataFull() {
            try {
                const response = await axios.get(`http://localhost:3000/trip`);
                setTripDataFull(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    // Get trip data by trip-ID - route is not implemented yet so it is not defined here and will not work :(
        async function getTripDataByID(id) {
            try {
                const response = await axios.get(`http://localhost:3000/trip/${id}`);
                setTripDataByID(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    
    // Get trip data by connected User-ID - route is not implemented yet so it is not defined here and will not work :(
        async function getTripDataByUser(id) {
            try {
                const response = await axios.get(`http://localhost:3000/user/${id}/trips`);
                setTripDataByUser(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    // Get trip data by query - route is not implemented yet so it is not defined here and will not work :(
        async function getTripDataByQuery(query) {
            try {
                const response = await axios.get(`http://localhost:3000/trip?query=${query}`);
                setTripDataByQuery(response.data);
            } catch (error) {
                console.error(error);
            }
        }




    return (
        <DataContext.Provider value=
        {{
            profileData,
            allUser,
            tripDataFull,
            tripDataByID,
            tripDataByUser,
            tripDataByQuery,
            getAllUser, 
            getProfileDataByID,
            getProfileDataByID,
            getTripDataFull,
            getTripDataByID,
            getTripDataByUser,
            getTripDataByQuery
        }}>
            {children}
        </DataContext.Provider>
    )

}