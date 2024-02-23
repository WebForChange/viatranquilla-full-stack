import React from "react";

function Usertrips() {
  return (
    <div>
      <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-sunset-400 mt-24">
        My Trips
      </h1>
      <div className="flex flex-col lg:flex-row mt-24">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center lg:w-1/2">
          <div class="card w-80 glass">
            <figure>
              <img src="https://picsum.photos/400/300" alt="car!" />
            </figure>
            <div class="card-body text-sunset-700">
              <h2 class="card-title">Life hack</h2>
              <p>How to park your car at your garage?</p>
              <div class="card-actions justify-end"></div>
            </div>
          </div>

          <div class="card w-80 glass">
            <figure>
              <img src="https://picsum.photos/400/300" alt="car!" />
            </figure>
            <div class="card-body text-sunset-700">
              <h2 class="card-title">Life hack</h2>
              <p>How to park your car at your garage?</p>
              <div class="card-actions justify-end"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usertrips;
