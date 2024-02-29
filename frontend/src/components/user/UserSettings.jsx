import { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../contexts/AuthProvider";
import axios from 'axios';

export default function UserSettings() {
    const { user } = useContext(AuthContext);
    const [preferences, setPreferences] = useState({});
    const [settings, setSettings] = useState({
        email: user.email,
        username: user.username,
        profilevisibility: preferences.profilevisibility,
        picturevisibility: preferences.picturevisibility,
        gendervisibility: preferences.gendervisibility,
        birthdatevisibility: preferences.birthdatevisibility,
        namevisibility: preferences.namevisibility,
        biografievisibility: preferences.biografievisibility,
        addressvisibility: preferences.addressvisibility,
        phonevisibility: preferences.phonevisibility,
        pasttripsvisibility: preferences.pasttripsvisibility
    });

    const fetchPreferences = async () => {
        try {
            const res = await axios.get(`http:localhost:3000/preferences/${user.username}`);
            setPreferences(res.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchPreferences();
    }, []);

    function handleUpload(data) {

    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`http:localhost:3000/preferences/${user.username}`, settings);
            if (response.status === 200) {
                console.log('Settings updated');
                fetchPreferences();
            } else {
                console.log('Settings not updated');
            }
        } catch (error) {
            console.log(err);
        }
    }

    function handleChange(e) {
        setSettings({...settings, [e.target.id]: e.target.value});
    }

    return (
        <>
            <form>
                <div>
                    <h2>Profile Picture</h2>
                    <img src="" alt={user.username} />
                    <label htmlFor="profile-picture">Upload a new profile picture</label>
                    <input type="file" id="profile-picture" onChange={handleUpload} />
                </div>

                <div>
                    <h2>User Settings</h2>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' value={settings.email} onChange={handleChange}/>
                    </div>
                </div>
                <div>
                    <h2>Privacy Settings</h2>
                    <h3>Profile</h3>
                    <div>
                        <label htmlFor='profile-visibility'>Profile Visibility</label>
                        <select id='profile-visibility' value={settings.profilevisibility} onChange={handleChange}>
                            <option value='public'>Public</option>
                            <option value='private'>Private</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='picture-visibility'>Picture Visibility</label>
                        <select id='picture-visibility' value={settings.picturevisibility} onChange={handleChange}>
                            <option value='public'>Public</option>
                            <option value='private'>Friends</option>
                            <option value='private'>Private</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='gender-visibility'>Gender Visibility</label>
                        <select id='gender-visibility' value={settings.gendervisibility} onChange={handleChange}>
                            <option value='public'>Public</option>
                            <option value='private'>Friends</option>
                            <option value='private'>Private</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='birthdate-visibility'>Birthdate Visibility</label>
                        <select id='birthdate-visibility' value={settings.birthdatevisibility} onChange={handleChange}>
                            <option value='public'>Public</option>
                            <option value='private'>Friends</option>
                            <option value='private'>Private</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='name-visibility'>Name Visibility</label>
                        <select id='name-visibility' value={settings.namevisibility} onChange={handleChange}>
                            <option value='public'>Public</option>
                            <option value='private'>Friends</option>
                            <option value='private'>Private</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='picture-visibility'>Biografie Visibility</label>
                        <select id='biografie-visibility' value={settings.biografievisibility} onChange={handleChange}>
                            <option value='public'>Public</option>
                            <option value='private'>Friends</option>
                            <option value='private'>Private</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='address-visibility'>Address Visibility</label>
                        <select id='address-visibility' value={settings.addressvisibility} onChange={handleChange}>
                            <option value='public'>Public</option>
                            <option value='private'>Friends</option>
                            <option value='private'>Private</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='phone-visibility'>Phone Visibility</label>
                        <select id='phone-visibility' value={settings.phonevisibility} onChange={handleChange}>
                            <option value='public'>Public</option>
                            <option value='private'>Friends</option>
                            <option value='private'>Private</option>
                        </select>
                    </div>
                    <div>
                        <h2>My Trips</h2>
                        <div>
                            <label htmlFor='pasttrips-visibility'>Trip Visibility</label>
                            <select id='pasttrips-visibility' value={settings.pasttripsvisibility} onChange={handleChange}>
                                <option value='public'>Public</option>
                                <option value='private'>Friends</option>
                                <option value='private'>Private</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}