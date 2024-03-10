import DashboardTrips from "../components/trips/DashboardTrips";
import ItemList from "../components/items/ItemList";
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
        <ItemList user={user} />
      </div>
      <div>
        <p>Vehicle</p>
      </div>
    </div>
  );
}

export default Dashboard;
