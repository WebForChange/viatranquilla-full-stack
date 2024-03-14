import React from "react";
import * as Unicons from "@iconscout/react-unicons";

function Route({trip}) {
  console.log(trip);
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  return (
    <>
    {!trip ? <p>Loading...</p> 
    :
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-sunset-400">Route</h2>
      <div className="flex flex-col justify-center items-center pb-8">
        <div className="w-full lg:w-1/2">
          <div className="collapse collapse-arrow bg-slate_gray-100">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium text-eggshell-600 flex items-center space-x-4 ">
              {!trip.pickupAdress ? null
              :
              <p>{trip.pickupAdress.city}</p>
              }
              <Unicons.UilCarSideview color={"#55BBA5"} size={28} />
            </div>
            <div className="collapse-content text-eggshell-600">
              {!trip.pickupAdress ? null
              : 
              <p>{trip.pickupAdress.address}</p> 
              }
              <p>{formatDate(trip.startDate)}</p>
            </div>
          </div>
{/*           <div className="collapse collapse-arrow bg-slate_gray-100">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium text-eggshell-600">
              Via Aachen
            </div>
            <div className="collapse-content text-eggshell-600">
              <p>23.05. - 18:00</p>
            </div>
          </div> */}
          <div className="collapse collapse-arrow bg-slate_gray-100">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium text-eggshell-600">
              {!trip.connections ? null
              :
              <p>{trip.connections[0].to.city}</p>
              }
            </div>
            <div className="collapse-content text-eggshell-600">
              <p>
              {!trip.connections ? null
              :
              <p>{trip.connections[0].to.address}</p>
              }
              </p>
              <p>{formatDate(trip.endDate)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
  </>
  );
}

export default Route;
