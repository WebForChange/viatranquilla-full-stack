import React from "react";
import Header from "../components/tripcomp/Header";
import Travellers from "../components/tripcomp/Travellers";
import Invitation from "../components/tripcomp/Invitation";
import Route from "../components/tripcomp/Route";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function TripDetails() {
  const [trip, setTrip] = useState({});
  const { _id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/trips/${_id}`)
      .then((res) => {
        setTrip(res.data);
      })
      .catch((err) => console.log(err));
  }
  , [_id]);
  
  return (
    <div>
      <Header trip={trip} />
      <Travellers trip={trip} />
      <Invitation trip={trip} />
      <Route trip={trip} />
    </div>
  );
}

export default TripDetails;
