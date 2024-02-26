import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import axios from 'axios';

export default function LoginForm() {
    const { loggedIn, setLoggedIn, checkLoggedIn } = useContext(AuthContext);
    const [mailError, setMailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [postLogin, setPostLogin] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setPostLogin({
            ...postLogin,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3000/auth/login', postLogin);
            if (data.error === 'email') {
                setMailError(true);
            } else {
                setMailError(false);
            }
            if (data.error === 'password') {
                setPasswordError(true);
            } else {
                setPasswordError(false);
            }
            if (data.token) {
                setLoggedIn(true);
                checkLoggedIn();
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <div>
            <form action="">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={postLogin.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={postLogin.password} onChange={handleChange} />
                </div>
                <p>Don't have an account? <a href="">Register</a></p>
                <button type="submit">Log in</button>
                <p><a href="">Forgot Password</a></p>
            </form>
        </div>
    )
}