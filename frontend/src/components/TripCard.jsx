import React from "react";
import { Link } from "react-router-dom";

function TripCard({ trip }) {
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  return (
    <div>
      {!trip ? (
        <h1>No Data...</h1>
      ) : (
        <Link to={`/tripdetails/${trip._id}`}>
          <div className="card w-80 md:w-1/36 glass">
            <figure>
              <img src="https://picsum.photos/400/300" alt="trip picture" />
            </figure>
            <div className="card-body text-sunset-700">
              <h2 className="card-title text-burnt_sienna-600 text-2xl font-bold">
                {trip.title}
              </h2>
              <p>{trip.description}</p>
              <p>
                <em>
                {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                </em>
              </p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

export default TripCard;
