import React, { useState } from 'react';
import axios from 'axios';

export default function Tripform() {
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
        const res = await axios.get(`http://localhost:3000/check-username/${username}`);
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

    return (
        <div>
            <form action="">
                <h2>Basic Information</h2>
                <div>
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
                <div>
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
                </div>
                    <label htmlFor="state">State:</label>
                    <input type="text" name="state" id="state" value={trip.state} onChange={handleChange} />
                    {/* logic for pickupAdress goes here */}
                    <label htmlFor="image">Image:</label>
                    <input type="text" name="image" id="image" value={trip.image.link} onChange={handleUpload} />
            </form>
        </div>
    )
}