import DashboardTrips from "../components/dashboard/DashboardTrips";
import ItemList from "../components/items/ItemList";
import MyVehicles from "../components/MyVehicles";
import Friendlist from "../components/dashboard/Friendlist";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="my-8">
      <div>
        <h1 className="mx-8 text-center text-3xl lg:text-4xl font-bold mb-4 text-sunset-400">
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
        <h2 className="mx-8 text-center text-3xl lg:text-3xl font-bold mb-4 text-sunset-400">Your Items</h2>
        <div>
          <ItemList username={user.username} />
        </div>
      </div>
      <div>
        <MyVehicles username={user.username} />
      </div>
    </div>
  );
}

export default Dashboard;
