import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function MyVehicles({username}) {
    const [vehicles, setVehicles] = useState([]);
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
    function editVehicle(id) {
        console.log(id);
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
                                <button onClick={() => editVehicle(vehicle.id)}>Edit</button>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}