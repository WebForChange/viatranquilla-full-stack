import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const DataContext = createContext();

export default function DataContextProvider({ children }) {
  const [profileData, setProfileData] = useState({});
  const [allUser, setAllList] = useState([]);
  const [myTripData, setMyTripData] = useState([]);
  const [tripDataByID, setTripDataByID] = useState([]);
  const [tripDataByUser, setTripDataByUser] = useState([]);
  const [tripDataByQuery, setTripDataByQuery] = useState([]);

  // Get profile data by Username. Do not send sensitive non display data like password - route is not implemented yet so it is not defined here and will not work :(
  async function getProfileDataByID(username) {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/${username}`
      );
      setProfileData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateProfile(username, data) {
    try {
      const response = await axios.put(
        `http://localhost:3000/users/edit/${username}`,
        data
      );
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
  async function getMyTripData() {
    try {
      const response = await axios.get("http://localhost:3000/trips", {
        withCredentials: true,
      });
      setMyTripData(response.data);
      console.log("DataContext: MyTripData: ", response.data);
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
  async function getTripDataByUser(username) {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/${username}/trips`
      );
      setTripDataByUser(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  // Get trip data by query - route is not implemented yet so it is not defined here and will not work :(
  async function getTripDataByQuery(query) {
    try {
      const response = await axios.get(
        `http://localhost:3000/trip?query=${query}`
      );
      setTripDataByQuery(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function addFriend(friendUsername) {
    try {
      const response = await axios.post(
        `http://localhost:3000/${friendUsername}/add-friend`
      );
      console.log("Profile Data: ", profileData);
      console.log("Response Data: ", response.data);
      //setProfileData(response.data); // Set friends = response.friends
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <DataContext.Provider
      value={{
        profileData,
        allUser,
        myTripData,
        tripDataByID,
        tripDataByUser,
        tripDataByQuery,
        getAllUser,
        getProfileDataByID,
        getMyTripData,
        getTripDataByID,
        getTripDataByUser,
        getTripDataByQuery,
        addFriend,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
