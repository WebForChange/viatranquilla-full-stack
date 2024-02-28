import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthProvider';
import { useParams } from 'react-router';

export default function ProfileForm() {
    const { user } = useContext(AuthContext);
    const username = user.username;
    const { id } = useParams();

    // user.id is the id of the logged in user from login state user.id

    const [userData, setUserData] = useState({
        id: user.id,
        firstname: '',
        lastname: '',
        birthdate: '',
        phone: '',
        street: '',
        housenumber: '',
        zip: '',
        city: '',
        country: '',
        state: '',
        profilepicture: '',
        bio: ''
    });

    function handleChange(event) {
        setUserData({
        ...userData, [event.target.id]: event.target.value 
        });
    }

    // post api missing
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/.../${id}`, userData, {
                withCredentials: true,  // Include this if you are using cookies for authentication
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5173',
                },
                body: JSON.stringify(userData)
            });
            console.log(response.data);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='p-8 text-eggshell-700 flex justify-center items-center'>
            <form className='flex flex-col space-y-4 justify-between'>
                <h2 className='text-3xl text-sunset-400'>Hello {username}</h2>
                <div className='flex flex-col'>
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" id="firstname" className='rounded p-2 text-delft_blue-100' value={userData.firstname} onChange={handleChange}/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" id="lastname" className='rounded p-2 text-delft_blue-100' value={userData.lastname} onChange={handleChange}/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="birthdate">Birth Date</label>
                    <input type="date" id="birthdate" className='rounded p-2 text-delft_blue-100' value={userData.birthdate} onChange={handleChange}/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" className='rounded p-2 text-delft_blue-100' value={userData.phone} onChange={handleChange}/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="street">Street</label>
                    <input type="text" id="street" className='rounded p-2 text-delft_blue-100' value={userData.street} onChange={handleChange}/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="housenumber">House Number</label>
                    <input type="text" id="housenumber" className='rounded p-2 text-delft_blue-100' value={userData.housenumber} onChange={handleChange}/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="zip">ZIP</label>
                    <input type="text" id="zip" className='rounded p-2 text-delft_blue-100' value={userData.zip} onChange={handleChange}/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" className='rounded p-2 text-delft_blue-100' value={userData.city} onChange={handleChange}/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" className='rounded p-2 text-delft_blue-100' value={userData.country} onChange={handleChange}/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" className='rounded p-2 text-delft_blue-100' value={userData.state} onChange={handleChange}/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="profilepicture">Profile Picture</label>
                    <input type="file" id="profilepicture" value={userData.profilepicture} onChange={handleChange}/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="bio">Bio</label>
                    <textarea id="bio" className='rounded p-2 text-delft_blue-100' rows="10" cols="30" value={userData.bio} onChange={handleChange}></textarea>
                </div>
                <div className='flex justify-center'>
                <button type="submit" className='btn w-1/2 bg-cambridge_blue-400 hover:bg-cambridge_blue-600 border-none' onClick={handleSubmit}>Save</button>
                </div>
            </form>
        </div>
    );
}