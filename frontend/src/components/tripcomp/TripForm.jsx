import React, { useState } from 'react';
import axios from 'axios';

export default function Tripform() {
    const [page, setPage] = useState(1);
    
    const [connection, setConnection] = useState({
        from: {
            adress: "",
            geolocation: {
                long: "",
                lat: "",
            },
        },
        to: {
            adress: "",
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
        image: {
            link: "",
        },
        publishedDate: "",
        creator: "",
        // participants: [],
        // checkpoints: [],
        // connections: [],
    });

    async function checkUsername(username) {
        const res = await axios.get(`http://localhost:3000/auth/check-username/${username}`);
        return res.data;
    }
    const handleChange = (e) => {
        setTrip({ ...trip, [e.target.name]: e.target.value });
    }
    const handleUpload = (e) => {
        setTrip({ ...trip, image: { link: e.target.value } });
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
    const handlePageUp = () => {
        if (page < 3) {
            setPage(page + 1);
        }
    }
    const handlePageDown = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    return (
        <div>
        <form action="">
            {page === 1 && <div>
                <h2>Basic Information</h2>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input type="text" name="image" id="image" value={trip.image.link} onChange={handleUpload} />
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" id="title" value={trip.title} onChange={handleChange} />
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" id="description" value={trip.description} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="startDate">Start Date:</label>
                    <input type="date" name="startDate" id="startDate" value={trip.startDate} onChange={handleChange} />
                    <label htmlFor="endDate">End Date:</label>
                    <input type="date" name="endDate" id="endDate" value={trip.endDate} onChange={handleChange} />
                </div>
            </div>}

            {page === 2 && <div>
                <h2>Where does your Trip Start?</h2>
                <label htmlFor="city">City:</label>
                <input type="text" name="city" id="city" value={trip.pickupAdress.city} onChange={handleChange} />
                <label htmlFor="address">Address:</label>
                <input type="text" name="address" id="address" value={trip.pickupAdress.address} onChange={handleChange} />
            </div>}

            {page === 3 && <div>
                    <h2>Invitation</h2>
                    <label htmlFor="invitationTitle">Title:</label>
                    <input type="text" name="invitationTitle" id="invitationTitle" value={invitation.title} onChange={handleInvitation} />
                    <label htmlFor="invitationMessage">Message:</label>
                    <input type="text" name="invitationMessage" id="invitationMessage" value={invitation.message} onChange={handleInvitation} />
                    <div>
                        {!invitation.invitants ? <h2>No Data...</h2> :
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
                {page === 3 && <button onClick={handleSubmit} >Submit</button>}
            </div>
        </form>
        </div>
    )
}