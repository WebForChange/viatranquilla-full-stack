import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import axios from 'axios';

export default function Tripform() {
    const { user } = useContext(AuthContext);
    console.log("tripform",user.username);
    const modes = ["car", "train", "bus", "plane", "ship", "bike", "teleport"];
    const [page, setPage] = useState(1);
    const [roundTrip, setRoundTrip] = useState(true);
    const [multiStops, setMultiStops] = useState(false);
    
    const [connection, setConnection] = useState({
        from: {
            city: "",
            address: "",
            geolocation: {
                long: "",
                lat: "",
            },
        },
        to: {
            city: "",
            address: "",
            geolocation: {
                long: "",
                lat: "",
            },
        },
        startDateTime: "",
        endDateTime: "",
        mode: "",
    });
    const [checkpoint, setCheckpoint] = useState({
        title: "",
        location: {
            adress: "",
            geolocation: {
                long: "",
                lat: "",
            },
        },
        type: "",
        suggestedBy: "",
    });
    const [invitation, setInvitation] = useState({
        title: "",
        message: "",
        invitationLink: "",
        invitants: [],
    });
    const [trip, setTrip] = useState({
        title: "",
        startDate: "",
        endDate: "",
        state: "active",
        description: "",
        invitation: "",
        pickupAdress: {
            city: "",
            address: "",
            geolocation: {
                long: "",
                lat: "",
            },
        },
        dropOff: {
            city: "",
            address: "",
            geolocation: {
                long: "",
                lat: "",
            },
        },
        roundtrip: true,
        image: {
            link: "",
        },
        publishedDate: "",
        creator: user.username,
        // participants: [],
        // checkpoints: [],
        connections: []
    });

    async function checkUsername(username) {
        const res = await axios.get(`http://localhost:3000/auth/check-username/${username}`);
        return res.data;
    }
    const handleChange = (e) => {
        if (e.target.name === "city") {
            setTrip({ ...trip, pickupAdress: { ...trip.pickupAdress, city: e.target.value } });
        } else if (e.target.name === "address") {
            setTrip({ ...trip, pickupAdress: { ...trip.pickupAdress, address: e.target.value } });
        } else if (e.target.name === "long") {
            setTrip({ ...trip, pickupAdress: { ...trip.pickupAdress, geolocation: { ...trip.pickupAdress.geolocation, long: e.target.value } } });
        } else if (e.target.name === "lat") {
            setTrip({ ...trip, pickupAdress: { ...trip.pickupAdress, geolocation: { ...trip.pickupAdress.geolocation, lat: e.target.value } } });
        } else if (e.target.name === "dropOffCity") {
            setTrip({ ...trip, dropOff: { ...trip.dropOff, city: e.target.value } });
        } else if (e.target.name === "dropOffAddress") {
            setTrip({ ...trip, dropOff: { ...trip.dropOff, address: e.target.value } });
        } else if (e.target.name === "dropOffLong") {
            setTrip({ ...trip, dropOff: { ...trip.dropOff, geolocation: { ...trip.dropOff.geolocation, long: e.target.value } } });
        } else if (e.target.name === "dropOffLat") {
            setTrip({ ...trip, dropOff: { ...trip.dropOff, geolocation: { ...trip.dropOff.geolocation, lat: e.target.value } } });
        } else if (e.target.name === "link") {
            setTrip({ ...trip, image: { link: e.target.value } });
        } else
        setTrip({ ...trip, [e.target.name]: e.target.value });
    }
    const handleUpload = (e) => {
    }
    const handleInvitation = (e) => {
        setInvitation({ ...invitation, [e.target.name]: e.target.value });
    }
    const addInvitant = (name) => {
        setInvitation({ ...invitation, names: [...invitation.names, name] });
    }
    const handleAddInvitant = (e) => {
        e.preventDefault();
        checkUsername(invitation.invitant);
        if (checkUsername(invitation.invitant)){
            addInvitant(invitation.invitant);
        } else {
            console.log("Username does not exist");
        }
    }
    const handlePageUp = (e) => {
        e.preventDefault();
        setPage(prevPage => {
            if (prevPage < 3) {
                return prevPage + 1;
            } else {
                return prevPage;
            }
        });
    };
    const handlePageDown = (e) => {
        e.preventDefault();
        setPage(prevPage => {
            if (prevPage > 1) {
                return prevPage - 1;
            } else {
                return prevPage;
            }
        });
    }
    const handleRoundtrip = (e) => {
        setRoundTrip(e.target.checked);
        setTrip({ ...trip, roundtrip: e.target.checked });
    }
    const handleMultiStops = (e) => {
        setMultiStops(e.target.checked);
    }
    const handleConnection = (e) => {
        if (e.target.name === "fromCity") {
            setConnection({ ...connection, from: { ...connection.from, city: e.target.value } });
        } else if (e.target.name === "fromAddress") {
            setConnection({ ...connection, from: { ...connection.from, address: e.target.value } });
        } else if (e.target.name === "toCity") {
            setConnection({ ...connection, to: { ...connection.to, city: e.target.value } });
        } else if (e.target.name === "toAddress") {
            setConnection({ ...connection, to: { ...connection.to, address: e.target.value } });
        } else if (e.target.name === "startDateTime") {
            setConnection({ ...connection, startDateTime: e.target.value });
        } else if (e.target.name === "endDateTime") {
            setConnection({ ...connection, endDateTime: e.target.value });
        } else if (e.target.name === "mode") {
            setConnection({ ...connection, mode: e.target.value });
        }
    }
    const saveConnection = (e) => {
        e.preventDefault();
        const updatedConnections = [...trip.connections];
        updatedConnections.push(connection);
        setTrip({ ...trip, connections: updatedConnections });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(trip);
    }
    const handleDelete = (e, index) => {
        e.preventDefault();
        const updatedConnections = [...trip.connections];
        updatedConnections.splice(index, 1);
        setTrip({ ...trip, connections: updatedConnections });
    }
    const handleSingleTrip = (e) => {
        e.preventDefault();
        setConnection(prevConnection => ({
            ...prevConnection,
            from: {
                ...prevConnection.from,
                city: trip.pickupAdress.city,
                address: trip.pickupAdress.address,
            },
            startDateTime: trip.startDate,
            endDateTime: trip.endDate,
        }));
        saveConnection(e);
    }


    return (
        <div>
        <form action="">
            {page === 1 && <div>
                <h2>Basic Information</h2>
                <div>
{/*                 <label htmlFor="image">Image:</label>
                    <input type="file" name="image" id="image" value={trip.image.link} onChange={handleUpload} /> */}
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" id="title" value={trip.title} onChange={handleChange} />
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" value={trip.description} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="startDate">Start Date:</label>
                    <input type="date" name="startDate" id="startDate" value={trip.startDate} onChange={handleChange} />
                    <label htmlFor="endDate">End Date:</label>
                    <input type="date" name="endDate" id="endDate" value={trip.endDate} onChange={handleChange} />
                </div>
            </div>}

            {page === 2 && <div>
                <div>
                    <h2>Where does your Trip Start?</h2>
                    <label htmlFor="city">Pickup City:</label>
                    <input type="text" name="city" id="city" value={trip.pickupAdress.city} onChange={handleChange} />
                    <label htmlFor="address">Pickup Address:</label>
                    <input type="text" name="address" id="address" value={trip.pickupAdress.address} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="return">Multiple Stops:</label>
                    <input type="checkbox" name="multiStops" id="multiStops" checked={multiStops} onChange={handleMultiStops} />
                </div>
                <div>
                    {!multiStops ? <h2>Whats your Destination?</h2> : <h2>Whats your first Connection during the Trip?</h2>}
                    {multiStops && <div>
                        {trip.connections.length === 0 ?
                        <h2>Add Details</h2> : <ul>
                            {trip.connections.map((connection, index) => (
                            <li key={index}><div className='bg-white'>
                                <div id='from'>
                                <p>City:</p><p>{connection.from.city}</p>
                                <p>Address:</p><p>{connection.from.address}</p>
                                </div>
                                <div id='mode'>
                                <p>Mode:</p><p>{connection.mode}</p>
                                </div>
                                <div id='to'>
                                <p>City:</p><p>{connection.to.city}</p>
                                <p>Address:</p><p>{connection.to.address}</p>
                                </div>
                                <div>
                                    <button onClick={(e) => handleDelete(e, index)}>Delete</button>
                                </div>
                                </div></li>
                        ))} </ul>}
                        <div>
                            <div>
                                <h2>From</h2>
                                <label htmlFor="fromCity">City:</label>
                                <input type="text" name="fromCity" id="fromCity" value={connection.from.city} onChange={handleConnection} />
                                <label htmlFor="fromAddress">Address:</label>
                                <input type="text" name="fromAddress" id="fromAddress" value={connection.from.address} onChange={handleConnection} />
                                <label htmlFor="startDateTime">Start Date:</label>
                                <input type="date" name="startDateTime" id="startDateTime" value={connection.startDateTime} onChange={handleConnection} />
                                <label htmlFor="mode">Mode:</label>
                                <select name="mode" id="mode" value={connection.mode} onChange={handleConnection}>
                                    {modes.map(mode => (
                                    <option key={mode} value={mode}>{mode}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <h2>To</h2>
                                <label htmlFor="toCity">City:</label>
                                <input type="text" name="toCity" id="toCity" value={connection.to.city} onChange={handleConnection} />
                                <label htmlFor="toAddress">Address:</label>
                                <input type="text" name="toAddress" id="toAddress" value={connection.to.address} onChange={handleConnection} />
                                <label htmlFor="endDateTime">End Date:</label>
                                <input type="date" name="endDateTime" id="endDateTime" value={connection.endDateTime} onChange={handleConnection} />
                            </div>
                        </div>
                        <button onClick={saveConnection}>Save Connection</button>
                        </div>}
                    {!multiStops && <div>
                        <div>
                        {!trip.connections.length === 0 ?
                        <h2>Add Details</h2> : <ul>
                            {trip.connections.map((connection, index) => (
                            <li key={index}><div className='bg-white'>
                                <div id='from'>
                                <p>City:</p><p>{connection.from.city}</p>
                                <p>Address:</p><p>{connection.from.address}</p>
                                </div>
                                <div id='mode'>
                                <p>Mode:</p><p>{connection.mode}</p>
                                </div>
                                <div id='to'>
                                <p>City:</p><p>{connection.to.city}</p>
                                <p>Address:</p><p>{connection.to.address}</p>
                                </div>
                                <div>
                                    <button onClick={(e) => handleDelete(e, index)}>Delete</button>
                                </div>
                                </div></li>
                        ))} </ul>}
                        </div>
                        <div>
                        <h2>To</h2>
                                <label htmlFor="toCity">City:</label>
                                <input type="text" name="toCity" id="toCity" value={connection.to.city} onChange={handleConnection} />
                                <label htmlFor="toAddress">Address:</label>
                                <input type="text" name="toAddress" id="toAddress" value={connection.to.address} onChange={handleConnection} />
                                <select name="mode" id="mode" value={connection.mode} onChange={handleConnection}>
                                    {modes.map(mode => (
                                    <option key={mode} value={mode}>{mode}</option>
                                    ))}
                                </select>
                                {trip.connections.length === 0 &&
                                <div><button onClick={handleSingleTrip}>Save</button></div>
                                }
                        </div>
                        </div>}
                </div>
{/*                 <div>
                    <h2>Return</h2>
                    <label htmlFor="return">Same as Start:</label>
                    <input type="checkbox" name="return" id="return" checked={roundTrip} onChange={handleRoundtrip} />
                    {!roundTrip && <div>
                        <h2>Drop off</h2>
                        <label htmlFor="city">City:</label>
                        <input type="text" name="dropOffCity" id="dropOffCity" value={trip.dropOff.city} onChange={handleChange} />
                        <label htmlFor="address">Pickup Address:</label>
                        <input type="text" name="dropOffAddress" id="dropOffAddress" value={trip.dropOff.address} onChange={handleChange} />
                    </div>}
                </div> */}
            </div>}

            {page === 3 && <div>
                    <h2>Invitation</h2>
                    <label htmlFor="invitationTitle">Title:</label>
                    <input type="text" name="invitationTitle" id="invitationTitle" value={invitation.title} onChange={handleInvitation} />
                    <label htmlFor="invitationMessage">Message:</label>
                    <input type="text" name="invitationMessage" id="invitationMessage" value={invitation.message} onChange={handleInvitation} />
                    <div>
                        {!invitation.invitants ? <h2>No Invites</h2> :
                            <ul>
                                {invitation.invitants.map((invitant) => (
                                    <li>{invitant}</li>
                                ))}
                            </ul>
                        }
                        <label htmlFor="invitant">Invitant:</label>
                        <input type="text" name="invitant" id="invitant" value={invitation.invitant} />
                        <button onClick={handleAddInvitant}>Add</button>
                    </div>
            </div>}
            <div>
                <button onClick={handlePageDown}>Previous</button>
                <button onClick={handlePageUp}>Next</button>
                {page === 3 && <button onClick={handleSubmit}>Submit</button>}
            </div>
        </form>
        </div>
    )
}