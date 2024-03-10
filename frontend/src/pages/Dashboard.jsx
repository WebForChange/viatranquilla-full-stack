import DashboardTrips from "../components/trips/DashboardTrips";
import ItemList from "../components/items/ItemList";
import MyVehicles from "../components/MyVehicles";
import { useContext } from "react";
import { DataContext } from "../contexts/DataContextProvider";

function Dashboard() {

  const { user } = useContext(DataContext);

  return (
    <div>
      <div>
        <DashboardTrips />
      </div>
      <div>
        <ItemList user={user.username} />
      </div>
      <div>
        <MyVehicles user={user.username} />
      </div>
    </div>
  );
}

export default Dashboard;
