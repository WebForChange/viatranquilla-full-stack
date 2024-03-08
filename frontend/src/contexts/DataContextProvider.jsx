import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const DataContext = createContext();

export default function DataContextProvider({ children }) {
  const [profileData, setProfileData] = useState({});
  const [allUser, setAllList] = useState([]);
  const [tripDataFull, setTripDataFull] = useState([]);
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

  async function addFriend(data) {
    try {
      const response = await axios.post(`http://localhost:3000/friends`, data);
      setProfileData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <DataContext.Provider
      value={{
        profileData,
        allUser,
        tripDataFull,
        tripDataByID,
        tripDataByUser,
        tripDataByQuery,
        getAllUser,
        getProfileDataByID,
        getTripDataFull,
        getTripDataByID,
        getTripDataByUser,
        getTripDataByQuery,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
