import React from "react";

function TripCard() {
  return (
    <div>
      <div className="card w-80 md:w-1/36 glass">
        <figure>
          <img src="https://picsum.photos/400/300" alt="trip picture" />
        </figure>
        <div className="card-body text-sunset-700">
          <h2 className="card-title text-burnt_sienna-600 text-2xl font-bold">Trip to Paris</h2>
          <p>Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi.</p>
          <p><em>Start: 23.05.2024 - End: 30.05.2024</em></p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  );
}

export default TripCard;
