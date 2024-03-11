import React from "react";
import TripCard from "../TripCard";

function Usertrips({ tripDataByUser }) {
  return (
    <div>
      <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-sunset-400 mt-24">
        My Trips
      </h1>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-8 justify-start items-center mt-12">
        {!tripDataByUser ? (
          <h1>No Data...</h1>
        ) : (
          <ul>
            {tripDataByUser.map((trip) => (
              <TripCard key={trip._id} value={trip} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Usertrips;
