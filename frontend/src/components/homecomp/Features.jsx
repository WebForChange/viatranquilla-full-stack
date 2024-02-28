import React from "react";
import * as Unicons from "@iconscout/react-unicons";

function Features() {
  return (
    <div className="features p-2">
      <div className="flex flex-col lg:flex-row mx-auto justify-center items-center gap-4 lg:gap-8 my-8 lg:mb-16">

        <div className="flex flex-col bg-cambridge_blue-200 glass rounded-xl p-4 text-eggshell-600 w-80 lg:w-96 items-center shadow-lg shadow-delft_blue-100">
          <Unicons.UilCar size={48} className="text-5xl text-sunset mb-4" />
          <div className="">
            <p className="text-justify">
              Plan trips with your friends. No matter if it's a Citytrip,
              Roadtrip or an unknown adventure. Plan start and end date, routes
              and possible stopovers. Are you planning on visiting certain
              places? Let your friends know about all plans. From sightseeing to
              eating out.
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-cambridge_blue-300 glass rounded-xl p-4 text-eggshell-600 w-80 lg:w-96 items-center shadow-lg shadow-delft_blue-100">
          <Unicons.UilUserArrows size={48} className="text-5xl text-sunset mb-4" />
          <div className="">
            <p className="text-justify">
              Get social and meet new friends. Find people with the same adventurer spirit as you. Share your trips and experiences with others. Get inspired by other people's trips and experiences. Find new friends and travel buddies to explore the world with.
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-cambridge_blue-200 glass rounded-xl p-4 text-eggshell-600 w-80 lg:w-96 items-center shadow-lg shadow-delft_blue-100">
          <Unicons.UilNotes size={48} className="text-5xl text-sunset mb-4" />
          <div className="">
            <p className="text-justify">
              Write down your thoughts and feelings. Share your trips and experiences with others. In your travel log you can write down everything you want to remember. From the best restaurant to the most beautiful sunset. Share your travel log with your friends and family.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Features;
