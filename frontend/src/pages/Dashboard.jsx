import DashboardTrips from "../components/trips/DashboardTrips";
import ItemList from "../components/items/ItemList";
import MyVehicles from "../components/MyVehicles";
import Friendlist from "../components/friends/Friendlist";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="my-8">
      <div>
        <h1 className="mx-8 text-3xl lg:text-5xl font-bold mb-4 text-sunset-400">
          Welcome {user.username}!
        </h1>
      </div>
      <div>
        <Friendlist username={user.username} />
      </div>
      <div>
        <DashboardTrips />
      </div>
      <div>
        <ItemList username={user.username} />
      </div>
      <div>
        <MyVehicles username={user.username} />
      </div>
    </div>
  );
}

export default Dashboard;
