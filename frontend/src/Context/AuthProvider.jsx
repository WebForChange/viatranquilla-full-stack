import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const AuthContext = createContext();

export default function AuthProvider( {children} ) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    
    const checkLoggedIn = async () => {
        try {
                const response = await axios.get('http://localhost:5000/auth/loggedIn', 
                {
                    withCredentials: true
                }
                );
            if (response.data === true) {
            setLoggedIn(true);
            setUser(response.data.user);
            } else {
            setLoggedIn(false);
            setUser({});
            }
        } catch (error) {
        console.error(error);
        setLoggedIn(false);
        setUser({});
        }
    };


    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            checkLoggedIn();
        }
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser, loggedIn, setLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
};