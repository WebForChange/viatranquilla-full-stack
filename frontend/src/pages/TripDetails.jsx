import React from "react";
import Header from "../components/tripcomp/Header";
import Travellers from "../components/tripcomp/Travellers";
import Invitation from "../components/tripcomp/Invitation";
import Route from "../components/tripcomp/Route";

function TripDetails() {
  return (
    <div>
      <Header />
      <Travellers />
      <Invitation />
      <Route />
    </div>
  );
}

export default TripDetails;
