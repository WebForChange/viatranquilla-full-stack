import { useEffect, useContext } from "react";
import TripCard from "../components/TripCard";
import { Link } from "react-router-dom";
import { DataContext } from "../contexts/DataContextProvider";

function Dashboard() {
  const { getMyTripData, user, myTripData } = useContext(DataContext);
  const { trips } = myTripData;
  useEffect(() => {
    getMyTripData();
  }, []);

  return (
    <div className="p-8">
        <Link to="/newtrip">
          <button className="text-2xl lg:text-4xl font-bold mb-4 text-sunset-400">Create-new-Trip-Button</button>
        </Link>
      <h3 className="text-2xl lg:text-4xl font-bold mb-4 text-sunset-400">
        Your Trips
      </h3>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-8 my-12 justify-center">
        {!trips ? (
          <p className="text-2xl lg:text-4xl font-bold mb-4 text-sunset-400">
            You have not created any trips yet
          </p>
        ) : (
          trips
          .filter((trip) => trip.creator === user.username)
          .sort((a, b) => new Date(a.publishedDate) - new Date(b.publishedDate))
          .map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))
        )}
      </div>

      <h3 className="text-2xl lg:text-4xl font-bold mb-4 text-sunset-400">
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
        .sort((a, b) => new Date(a.publishedDate) - new Date(b.publishedDate))
        .map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))
      )}
      </div>
    </div>
  );
}

export default Dashboard;
