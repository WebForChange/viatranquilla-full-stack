import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export default function MyVehicles( {username} ) {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    console.log("MyVehicles username: ", username);
    async function getVehicles() {
        try {
            const res = await axios.get(`http://localhost:3000/vehicles/${username}`);
            setVehicles(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getVehicles();
    }, []);
    function deleteVehicle(id) {
        axios.delete(`http://localhost:3000/vehicles/${id}`)
            .then(() => {
                getVehicles();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    function editVehicle(vehicle) {
        navigate(`/edit-vehicle/${vehicle.id}`, { state: { vehicle } });
    }
    return (
        <div>
            {vehicles.length === 0 ? <h2>No Vehicles</h2> :
                vehicles.map((vehicle) => {
                return (
                <div key={vehicle.id}>
                <div>
                <img src={vehicle.image} alt="vehicle" />
                </div>
                <div>
                    <p>{vehicle.make}</p>
                    <p>{vehicle.model}</p>
                    <p>{vehicle.year}</p>
                    <p>{vehicle.color}</p>
                    <p>{vehicle.seats}</p>
                    <button onClick={() => deleteVehicle(vehicle.id)}>Delete</button>
                    <button onClick={() => editVehicle(vehicle)}>Edit</button>
                </div>
            </div>
        );
    })
}
        </div>
    );
}