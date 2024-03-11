import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../contexts/AuthProvider";
import axios from 'axios';

export default function Friendlist({username}) {
    const [friends, setFriends] = useState([]);
    console.log("friendlist",username);

    async function getFriends() {
        try {
            const friends = await axios.get(`http://localhost:3000/users/${username}/friends`);
            setFriends(data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getFriends();
    }, []);

    return (
        <div id="parent">
            <h2>Deine Freunde</h2>
            {friends.length === 0 
            ?
            <p>Du hast noch keine Freunde.</p> 
            :
            <ul>
                {friends.map((friend, index) => {
                    return <li key={index}>{friend}</li>
                })}
            </ul>
            }
        </div>
    );
}