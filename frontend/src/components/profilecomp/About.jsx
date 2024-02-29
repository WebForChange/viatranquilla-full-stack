import React from "react";
import { DataContext } from "../../contexts/DataContextProvider";
import { useContext } from "react";

function About() {
  const { profileData } = useContext(DataContext);

  // Birthdate is a string, we need to convert it to a date object
  const birthDate = profileData.birthDate ? new Date(profileData.birthDate) : new Date();

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Calculate the age of the user based on the birthdate and the current year and month and day of the birthdate and current date to check if the birthday has already passed  
  const age = currentYear - birthDate.getFullYear() - (new Date() < new Date(currentYear, birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);




  return (
    <div className="mt-8 flex flex-col lg:flex-row lg:justify-start items-center text-white">
      <div className="flex flex-col ">
        <div className="flex flex-col lg:w-2/3">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-sunset-400">
            About me
          </h1>
          <p className="text-justify ">
           {profileData.bio}
          </p>
          <h4 className="text-2xl lg:text-4xl font-bold mb-4 text-sunset-400">Age</h4>
          <p>{age}</p>
          <h4 className="text-2xl lg:text-4xl font-bold mb-4 text-sunset-400">Location</h4>
          <p>{profileData.city}</p>
          <p>{profileData.country}</p>
        </div>

        <div className="flex flex-col mt-12">
          <h3 className="text-2xl lg:text-4xl font-bold mb-4 text-sunset-400">
            Blabla Brummbrumm
          </h3>
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
            molestias!
          </p>
        </div>
        <div className="flex flex-col mt-12">
          <h3 className="text-2xl lg:text-4xl font-bold mb-4 text-sunset-400">
            Spontan oder geplant?
          </h3>
          <p className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
            molestias!
          </p>
        </div>
        <div className="flex flex-col mt-12">
          <h3 className="text-2xl lg:text-4xl font-bold mb-4 text-sunset-400">
          Frühaufsteher oder Nachteule?
          </h3>
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
            molestias!
          </p>
        </div>
        <div className="flex flex-col mt-12">
          <h3 className="text-2xl lg:text-4xl font-bold mb-4 text-sunset-400">
          Strand, Berge oder Stadt?
          </h3>
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
            molestias!
          </p>
        </div>
        <div className="flex flex-col mt-12">
          <h3 className="text-2xl lg:text-4xl font-bold mb-4 text-sunset-400">
          Kochen oder Essen gehen?
          </h3>
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
            molestias!
          </p>
        </div>



      </div>
    </div>
  );
}

export default About;
