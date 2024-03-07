import React from "react";
import TripCard from "../components/TripCard";

function Trips() {
  return (
    <div className="p-8">
      <h3 className="text-2xl lg:text-4xl font-bold mb-4 text-sunset-400">
        Your Trips
      </h3>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-8 my-12 justify-center">
        <TripCard />
        <TripCard />
        <TripCard />
        <TripCard />
      </div>

      <h3 className="text-2xl lg:text-4xl font-bold mb-4 text-sunset-400">
        Trips to join
      </h3>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-8 my-12 justify-center">
        <TripCard />
        <TripCard />
        <TripCard />
        <TripCard />
      </div>
    </div>
  );
}

export default Trips;
