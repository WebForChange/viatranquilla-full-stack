import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function MyVehicles({user}) {
    const [vehicles, setVehicles] = useState([]);

    return (
        <div>
            <h1>My Vehicles</h1>
        </div>
    );
}