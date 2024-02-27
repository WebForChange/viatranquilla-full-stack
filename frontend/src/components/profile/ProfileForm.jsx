import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function ProfileForm() {
    const { user } = useContext(AuthContext);

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

    function handleSubmit(event) {
    }

    return (
        <div>
            <form>
                <div>
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" id="firstname" value={userData.firstname} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" id="lastname" value={userData.lastname} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="birthdate">Birth Date</label>
                    <input type="date" id="birthdate" value={userData.birthdate} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" value={userData.phone} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="street">Street</label>
                    <input type="text" id="street" value={userData.street} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="housenumber">House Number</label>
                    <input type="text" id="housenumber" value={userData.housenumber} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="zip">ZIP</label>
                    <input type="text" id="zip" value={userData.zip} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" value={userData.city} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" value={userData.country} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" value={userData.state} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="profilepicture">Profile Picture</label>
                    <input type="file" id="profilepicture" value={userData.profilepicture} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="bio">Bio</label>
                    <textarea id="bio" rows="10" cols="30" value={userData.bio} onChange={handleChange}></textarea>
                </div>
                <button type="submit" onClick={handleSubmit}>Save</button>
            </form>
        </div>
    );
}