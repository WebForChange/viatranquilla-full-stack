import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import axios from 'axios';
import { toast } from "react-toastify";
import { Link, redirect, useNavigate } from "react-router-dom";

export default function Tripform() {
    const { user } = useContext(AuthContext);
    console.log("tripform",user.username);
    const modes = ["car", "train", "bus", "plane", "ship", "bike", "teleport"];
    const [page, setPage] = useState(1);
    const [roundTrip, setRoundTrip] = useState(true);
    const [multiStops, setMultiStops] = useState(false);

    const navigate = useNavigate();
    
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
        startDate: "",
        startDatetime: "",
        endDate: "",
        endDatetime: "",
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
        } else if (e.target.name === "startDate") {
            setConnection({ ...connection, startDate: e.target.value });
        } else if (e.target.name === "endDate") {
            setConnection({ ...connection, endDate: e.target.value });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/trips/", trip, {
                withCredentials: true
            });
            toast.success("You successfully created a Trip!");
            console.log(trip);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };


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
            startDate: trip.startDate,
            endDate: trip.endDate,
        }));
        saveConnection(e);
    }


    return (
        <div className="text-eggshell-600 w-full h-screen p-4">
        <form className="flex flex-col gap-4 justify-between items-center">
            {page === 1 && <div>
                <h2>Basic Information</h2>
                <div className="flex flex-col">
{/*                 <label htmlFor="image">Image:</label>
                    <input type="file" name="image" id="image" value={trip.image.link} onChange={handleUpload} /> */}
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" id="title" value={trip.title} onChange={handleChange} className="p-1 rounded text-delft_blue-100"/>
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" value={trip.description} onChange={handleChange} className="p-1 rounded text-delft_blue-100"/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="startDate">Start Date:</label>
                    <input type="date" name="startDate" id="startDate" value={trip.startDate} onChange={handleChange} className="p-1 rounded text-delft_blue-100"/>
                    <label htmlFor="endDate">End Date:</label>
                    <input type="date" name="endDate" id="endDate" value={trip.endDate} onChange={handleChange} className="p-1 rounded text-delft_blue-100"/>
                </div>
            </div>}

            {page === 2 && <div>
                <div className="flex flex-col">
                    <h2>Where does your Trip Start?</h2>
                    <label htmlFor="city">Pickup City:</label>
                    <input type="text" name="city" id="city" value={trip.pickupAdress.city} onChange={handleChange} className="p-1 rounded text-delft_blue-100"/>
                    <label htmlFor="address">Pickup Address:</label>
                    <input type="text" name="address" id="address" value={trip.pickupAdress.address} onChange={handleChange} className="p-1 rounded text-delft_blue-100"/>
                </div>
                <div>
                    <label htmlFor="return">Multiple Stops:</label>
                    <input type="checkbox" name="multiStops" id="multiStops" checked={multiStops} onChange={handleMultiStops} className="p-1 rounded text-delft_blue-100"/>
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
                            <div className='mt-3 flex flex-col'>
                                <h2>From</h2>
                                <label htmlFor="fromCity">City:</label>
                                <input type="text" name="fromCity" id="fromCity" value={connection.from.city} onChange={handleConnection} className="p-1 rounded text-delft_blue-100"/>
                                <label htmlFor="fromAddress">Address:</label>
                                <input type="text" name="fromAddress" id="fromAddress" value={connection.from.address} onChange={handleConnection} className="p-1 rounded text-delft_blue-100"/>
                                <label htmlFor="startDate">Start Date:</label>
                                <input type="date" name="startDate" id="startDate" value={connection.startDate} onChange={handleConnection} className="p-1 rounded text-delft_blue-100"/>
                                <label htmlFor="mode">Mode:</label>
                                <select name="mode" id="mode" value={connection.mode} onChange={handleConnection}>
                                    {modes.map(mode => (
                                    <option key={mode} value={mode}>{mode}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='mt-3 flex flex-col'>
                                <h2>To</h2>
                                <label htmlFor="toCity">City:</label>
                                <input type="text" name="toCity" id="toCity" value={connection.to.city} onChange={handleConnection} className="p-1 rounded text-delft_blue-100"/>
                                <label htmlFor="toAddress">Address:</label>
                                <input type="text" name="toAddress" id="toAddress" value={connection.to.address} onChange={handleConnection} className="p-1 rounded text-delft_blue-100"/>
                                <label htmlFor="endDate">End Date:</label>
                                <input type="date" name="endDate" id="endDate" value={connection.endDate} onChange={handleConnection} className="p-1 rounded text-delft_blue-100"/>
                            </div>
                        </div>
                        <button onClick={saveConnection} className="mt-3 btn bg-eggshell-500 text-delft_blue-100 border-none hover:bg-cambridge_blue-500">Save Connection</button>
                        </div>}
                    {!multiStops && <div>
                        <div >
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
                                    <button onClick={(e) => handleDelete(e, index)} >Delete</button>
                                </div>
                                </div></li>
                        ))} </ul>}
                        </div>
                        <div className="flex flex-col gap-1">
                        <h2>To</h2>
                                <label htmlFor="toCity">City:</label>
                                <input type="text" name="toCity" id="toCity" value={connection.to.city} onChange={handleConnection} className="p-1 rounded text-delft_blue-100"/>
                                <label htmlFor="toAddress">Address:</label>
                                <input type="text" name="toAddress" id="toAddress" value={connection.to.address} onChange={handleConnection} className="p-1 rounded text-delft_blue-100"/>
                                <label htmlFor="mode">Mode:</label>
                                <select name="mode" id="mode" value={connection.mode} onChange={handleConnection}>
                                    {modes.map(mode => (
                                    <option key={mode} value={mode}>{mode}</option>
                                    ))}
                                </select>
                                {trip.connections.length === 0 &&
                                <div><button onClick={handleSingleTrip} className="mt-3 btn bg-eggshell-500 text-delft_blue-100 border-none hover:bg-cambridge_blue-500">Save</button></div>
                                }
                        </div>
                        </div>}
                </div>
            </div>}

            {page === 3 && <div className="flex flex-col">
                    <h2>Invitation</h2>
                    <label htmlFor="invitationTitle">Title:</label>
                    <input type="text" name="invitationTitle" id="invitationTitle" value={invitation.title} onChange={handleInvitation} className="p-1 rounded text-delft_blue-100"/>
                    <label htmlFor="invitationMessage">Message:</label>
                    <input type="text" name="invitationMessage" id="invitationMessage" value={invitation.message} onChange={handleInvitation} className="p-1 rounded text-delft_blue-100"/>
                    <div className="flex flex-col gap-2">
                        {!invitation.invitants ? <h2>No Invites</h2> :
                            <ul>
                                {invitation.invitants.map((invitant) => (
                                    <li>{invitant}</li>
                                ))}
                            </ul>
                        }
                        <label htmlFor="invitant">Invitant:</label>
                        <input type="text" name="invitant" id="invitant" value={invitation.invitant} className="p-1 rounded text-delft_blue-100"/>
                        <button onClick={handleAddInvitant} className="btn bg-cambridge_blue-200 text-delft_blue-100 border-none hover:bg-cambridge_blue-500">Add</button>
                    </div>
            </div>}
            <div className='flex gap-3'>
                <button onClick={handlePageDown} className="btn bg-eggshell-500 text-delft_blue-100 border-none hover:bg-cambridge_blue-500">Previous</button>
                <button onClick={handlePageUp} className="btn bg-eggshell-500 text-delft_blue-100 border-none hover:bg-cambridge_blue-500">Next</button>
                {page === 3 && <button onClick={handleSubmit} className="btn bg-cambridge_blue-400 border-none hover:bg-cambridge_blue-500">Submit</button>}
            </div>
        </form>
        </div>
    )
}