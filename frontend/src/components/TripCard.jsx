import React from "react";
function TripCard({ trip }) {


  return (
    <div>
    {!trip ? <h1>No Data...</h1> :
      <div className="card w-80 md:w-1/36 glass">
        <figure>
          <img src="https://picsum.photos/400/300" alt="trip picture" />
        </figure>
        <div className="card-body text-sunset-700">
          <h2 className="card-title text-burnt_sienna-600 text-2xl font-bold">{trip.title}</h2>
          <p>{trip.description}</p>
          <p><em>{trip.startDate} - {trip.endDate}</em></p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    }
    </div>
  );
}

export default TripCard;
