import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';


export default function MyVehicles( {username} ) {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    console.log("MyVehicles username: ", username);
    async function getVehicles() {
        try {
            if (username) {
            const res = await axios.get(`http://localhost:3000/vehicles/${username}`, {
                withCredentials: true
            });
            setVehicles(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getVehicles();
    }, [username]);
    
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
        <>
            <div className="flex flex-col md:flex-row md:flex-wrap gap-8 my-12 justify-center">
            <Link to="/newvehicle">
                <button className="mt-4 w-340  px-7 py-3 rounded-lg bg-delft_blue-300 border-none hover:bg-cambridge_blue-400 text-eggshell-500 font-semibold text-xl">
                Create new Vehicle
                </button>
            </Link>
            </div>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-8 my-12 justify-center">
            {vehicles.length === 0 ? <h2>No Vehicles</h2> :
                vehicles.map((vehicle) => {
                    return (
                        <div key={vehicle._id} >
                <div className="flex flex-col md:flex-row md:flex-wrap gap-8 my-12 justify-center card w-80 md:w-1/36 glass text-burnt_sienna-600 text-2xl font-bold">
                <img src={vehicle.image} alt="Your Vehicle image" />
                </div>
                <div className="flex p-3 ml-2 card-body text-sunset-700 card w-80 md:w-1/36 glass ">
                    <p>{vehicle.make}</p>
                    <p>{vehicle.model}</p>
                    <p>{vehicle.year}</p>
                    <p>{vehicle.color}</p>
                    <p>{vehicle.seats}</p>
                    <button className="text-cambridge_blue-600 gap-5" onClick={() => deleteVehicle(vehicle.id)}>Delete</button>
                    <button className="text-cambridge_blue-600 gap-5" onClick={() => editVehicle(vehicle)}>Edit</button>
                </div>
            </div>
        );
    })
}
        </div>
    </>
    );
}