import DashboardTrips from "../components/trips/DashboardTrips";
import ItemList from "../components/items/ItemList";
import MyVehicles from "../components/MyVehicles";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

function Dashboard() {
const { user } = useContext(AuthContext);

  return (
    <div>
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
