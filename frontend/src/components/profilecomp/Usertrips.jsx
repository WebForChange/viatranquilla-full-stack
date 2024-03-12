import React from "react";
import TripCard from "../TripCard";
import { useEffect } from "react";

function Usertrips({ tripDataByUser }) {
  useEffect(() => {
    console.log("Usertrips: tripDataByUser: ", tripDataByUser);
  }, [tripDataByUser]);

  return (
    <div>
      <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-sunset-400 mt-10">
        My Trips
      </h2>
      {tripDataByUser ? (
        <ul className="flex flex-col md:flex-row md:flex-wrap gap-8 justify-start items-start mt-12">
          {tripDataByUser.map((trip) => (
            <TripCard key={trip._id} trip={trip} />
          ))}
        </ul>
      ) : (
        <p>Trip not found</p>
      )}
    </div>
  );
}

export default Usertrips;
