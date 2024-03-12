import React from "react";
import { DataContext } from "../../contexts/DataContextProvider";
import { useContext } from "react";

function About() {
  const { profileData } = useContext(DataContext);
  // create age from birthdate
  const birthDate = profileData.birthDate
    ? new Date(profileData.birthDate)
    : new Date();
  const currentYear = new Date().getFullYear();
  const birthyear = birthDate.getFullYear();
  const age =
    currentYear -
    birthDate.getFullYear() -
    (new Date() <
    new Date(currentYear, birthDate.getMonth(), birthDate.getDate())
      ? 1
      : 0);

  return (
    <div className="mt-8 flex flex-col lg:flex-row lg:justify-start items-center text-white">
      <div className="flex flex-col w-full">
        <div className="flex flex-col lg:flex-row justify-start lg:space-x-14">
          <div>
            <h4 className="text-2xl lg:text-3xl font-bold mb-4 text-sunset-400">
              Age
            </h4>
            <p className="text-xl font-semibold">{age}</p>
          </div>
          <div>
            <h4 className="text-2xl lg:text-3xl font-bold mb-4 text-sunset-400">
              Location
            </h4>
            <p className="text-xl font-semibold">{profileData.city}</p>
            <p className="text-xl font-semibold">{profileData.country}</p>
          </div>
          <div className="">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-sunset-400">
              About me
            </h2>
            <p className="text-justify mb-5 text-xl font-semibold">
              {profileData.bio}
            </p>
          </div>
        </div>

        <div className="flex flex-row flex-wrap justify-start">
          <div className="flex flex-col mt-6 mr-7 sm:w-3/7">
            <h3 className="text-xl lg:text-2xl font-bold mb-4 text-sunset-400">
              Communication style
            </h3>
            <p className="text-justify text-xl font-semibold">
              {profileData.blabla}
            </p>
          </div>
          <div className="flex flex-col mt-6 mr-7 sm:w-3/7">
            <h3 className="text-xl lg:text-2xl font-bold mb-4 text-sunset-400">
              Spontan oder geplant?
            </h3>
            <p className="text-justify text-xl font-semibold">
              {profileData.planning}
            </p>
          </div>
          <div className="flex flex-col mt-6 mr-7 sm:w-3/7">
            <h3 className="text-xl lg:text-2xl font-bold mb-4 text-sunset-400">
              Frühaufsteher oder Nachteule?
            </h3>
            <p className="text-justify text-xl font-semibold">
              {profileData.earlyBird}
            </p>
          </div>
          <div className="flex flex-col mt-6 mr-7 sm:w-3/7">
            <h3 className="text-xl lg:text-2xl font-bold mb-4 text-sunset-400">
              Strand, Berge oder Stadt?
            </h3>
            <p className="text-justify text-xl font-semibold">
              {profileData.mtBeachCity}
            </p>
          </div>
          <div className="flex flex-col mt-6 mr-7 sm:w-3/7">
            <h3 className="text-xl lg:text-2xl font-bold mb-4 text-sunset-400">
              Kochen oder Essen gehen?
            </h3>
            <p className="text-justify text-xl font-semibold">
              {profileData.cookEatOut}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
