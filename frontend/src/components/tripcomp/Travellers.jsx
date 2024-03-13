import React from "react";
import { useEffect } from "react";

function Travellers({ trip }) {
  useEffect(() => {
    console.log("Travelers: trip: ", trip);
  }, [trip]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-sunset-400">Travellers</h2>
      <ul className="flex flex-row space-x-6">
        {trip.participants ? (
          trip.participants.map((participant, index) => (
            <li key={index} className="flex flex-col items-center ">
              <img
                src={
                  participant.profilePicture ||
                  "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                }
                alt="avatar"
                className="w-20 h-20 rounded-full mb-2"
              />
              <span className="text-white font-semibold text-xl">
                {participant.username}
              </span>
            </li>
          ))
        ) : (
          <li>Participants will appear here</li>
        )}
      </ul>
      {/* <div className="space-x-4">
        <div className="avatar">
          <div className="w-16 lg:w-24 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>

        <div className="avatar">
          <div className="w-16 lg:w-24 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>

        <div className="avatar">
          <div className="w-16 lg:w-24 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>

        <div className="avatar">
          <div className="w-16 lg:w-24 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Travellers;
