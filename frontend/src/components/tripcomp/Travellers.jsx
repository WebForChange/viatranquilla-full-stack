import React from "react";

function Travellers({ trip }) {

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-sunset-400">Travellers</h2>
      <ul>
        {trip.participants?.map((participant) => (
          <li key={participant.id} className="flex items-center space-x-2">
            <img
              src={participants.image || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <span>{participant.username}</span>
          </li>
        ))}
      </ul>
      <div className="space-x-4">
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
      </div>
    </div>
  );
}

export default Travellers;
