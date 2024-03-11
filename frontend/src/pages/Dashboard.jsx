import DashboardTrips from "../components/trips/DashboardTrips";
import ItemList from "../components/items/ItemList";
import MyVehicles from "../components/MyVehicles";
import Friendlist from "../components/friends/Friendlist";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

function Dashboard() {
const { user } = useContext(AuthContext);

  return (
    <div>
      <div>
        <h1>Welcome {user.username}!</h1>
      </div>
      <div>
        <Friendlist username={user.username}/>
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
