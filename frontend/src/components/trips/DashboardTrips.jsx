import React, { useContext, useEffect } from "react";
import TripCard from "../TripCard";
import { Link } from "react-router-dom";
import { DataContext } from "../../contexts/DataContextProvider";
import { AuthContext } from "../../contexts/AuthProvider";

export default function DashboardTrips() {
  const { getMyTripData, myTripData } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    getMyTripData();
  }, [user]);

  return (
    <div className="p-8">
      <Link to="/newtrip">
        <button className="mb-8 w-340 h-12 px-5 rounded-lg bg-cambridge_blue-200 border-none hover:bg-cambridge_blue-400 text-eggshell-500">
          Create new Trip
        </button>
      </Link>

      <h3 className="text-2xl lg:text-4xl font-bold mb-4 text-sunset-400">
        Your Trips
      </h3>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-8 my-12 justify-start">
        {!myTripData ? (
          <p className="text-2xl lg:text-4xl font-bold mb-4 text-sunset-400">
            You have no trips yet
          </p>
        ) : (
          //   myTripData.map((trip) => <p>{trip}</p>)
          myTripData
            //   .filter((trip) => trip.creator === user.username)
            .sort(
              (a, b) => new Date(a.publishedDate) - new Date(b.publishedDate)
            )
            .map((trip) => <TripCard key={trip._id} trip={trip} />)
        )}
      </div>

      {/* <h3 className="text-2xl lg:text-4xl font-bold mb-4 text-sunset-400">
        Trips you joined
      </h3>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-8 my-12 justify-center">
        {!trips ? (
          <p className="text-2xl lg:text-4xl font-bold mb-4 text-sunset-400">
            You have not joined any trips yet
          </p>
        ) : (
          trips
            .filter((trip) => trip.creator !== user.username)
            .sort(
              (a, b) => new Date(a.publishedDate) - new Date(b.publishedDate)
            )
            .map((trip) => <TripCard key={trip.id} trip={trip} />)
        )}
      </div> */}
    </div>
  );
}
