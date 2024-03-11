import { useEffect, useContext } from "react";
import Profileheader from "../components/profilecomp/Profileheader";
import About from "../components/profilecomp/About";
import Usertrips from "../components/profilecomp/Usertrips";
import { DataContext } from "../contexts/DataContextProvider";
import { useParams } from "react-router-dom";

function Userprofile() {
  const { username } = useParams();
  const { tripDataByUser, getTripDataByUser } = useContext(DataContext);

  useEffect(() => {
    getTripDataByUser(username);
  }, []);

  return (
    <div className="flex flex-col w-full h-auto p-12">
      <Profileheader />
      <About />
      {!tripDataByUser ? (
        <h1>No Data...</h1>
      ) : (
        <Usertrips tripDataByUser={tripDataByUser} />
      )}
    </div>
  );
}

export default Userprofile;
