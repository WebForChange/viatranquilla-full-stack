import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, link } from 'react-router-dom';
import axios from 'axios';


export default function MyVehicles() {
    const { user } = useContext(AuthContext);
    const [vehicles, setVehicles] = useState([]);
    async function getVehicles() {
        try {
            const res = await axios.get(`http://localhost:3000/vehicles/${user.username}`);
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
        console.log(vehicle);
    }
    return (
        <div>
            {!vehicles ? <h1>No Data...</h1> :
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