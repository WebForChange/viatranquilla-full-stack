import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import googleButton from "../../assets/btn_google.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showSuccessAlert } from '../shared/toastUtils';

export default function RegisterForm() {
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        birthday: '',
        password: '',
        password2: ''
    });
    const [pwMatch, setPwMatch] = useState(null);
    const [mailTaken, setMailTaken] = useState(null);
    const [userTaken, setUserTaken] = useState(null);


    const handleChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            registerData.password !== registerData.password2 ||
            !registerData.username ||
            !registerData.email ||
            !registerData.birthday ||
            !registerData.password
            ) {
            setPwMatch(false);
        } else {
            setPwMatch(true);
            try {
                const {email, username } = registerData;
                const { data } = await axios.post('http://localhost:3000/auth/register-check', { email, username }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    }
                });
                if (data.emailTaken) {
                    setMailTaken(true);
                } else {
                    setMailTaken(false);
                }
                if (data.userTaken) {
                    setUserTaken(true);
                } else {
                    setUserTaken(false);
                }
                if (!data.emailTaken && !data.userTaken) {
                    await axios.post('http://localhost:3000/auth/register', registerData);
                    setRegisterData({
                        username: '',
                        email: '',
                        birthday: '',
                        password: '',
                        password2: ''
                    });
                    toast.success("You have successfully registered!", {
                        position: "top-center"
                      });
                    setTimeout(() => {
                        navigate("/login");
                    }, 2500)
                } 
            } catch (error) {
                console.error(error);
            }
        }
    };

    function navigate(url){
        window.location.href = url
      }
    
      async function auth(){
        const response = await fetch('http://127.0.0.1:3000/request',{method:'post'});
        const data = await response.json();
        navigate(data.url);
        }
        
    return (
        <div className='text-eggshell-600 w-full h-screen p-4'>

            <p className='font-semibold text-center mb-6'>Enter your details below or <Link to="/login">log in</Link></p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 justify-between items-center'>
                <div className='flex flex-col'>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" className='p-1 rounded text-delft_blue-100' value={registerData.username} onChange={handleChange} />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className='p-1 rounded text-delft_blue-100' value={registerData.email} onChange={handleChange} />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="birthday">Date of Birth</label>
                    <input type="date" id="birthday" className='p-1 rounded text-delft_blue-100' value={registerData.birthday} onChange={handleChange} />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className='p-1 rounded text-delft_blue-100' value={registerData.password} onChange={handleChange}/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" id="password2" className='p-1 rounded text-delft_blue-100' value={registerData.password2} onChange={handleChange}/>
                </div>
                <button type="submit" className='btn bg-cambridge_blue-400 border-none hover:bg-cambridge_blue-500'>Register</button>
                <button type="button" onClick={()=>auth()}><img src={googleButton} alt="google sign in"/></button>
            </form>
            <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition: Zoom/>
        </div>
    )
}