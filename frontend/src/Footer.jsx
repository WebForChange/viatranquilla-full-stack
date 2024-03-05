import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './contexts/AuthProvider'

function Footer() {
    const { loggedIn } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    const username = user.username;
  return (
    <div className='bg-delft_blue-300 w-full min-h-[50px] shadow-[0px_-9px_20px_10px_#171717] p-4 text-eggshell-700'>
        <div className='flex flex-col sm:flex-row justify-center space-y-8 sm:space-y-0 sm:space-x-8 items-center h-full mb-4'>
            <div className='flex flex-col items-center lg:items-start '>
                <Link to={"/"} >Home</Link>
                <Link to={"/trips"} >Trips</Link>
                
            </div>

            {loggedIn ? (
                <div className='flex flex-col items-center lg:items-start '>
                    <Link to={"/user/" + username} >Your profile</Link>
                    <Link to={"/dashboard"} >Your Trips</Link>
                </div>
            ) : (
                <div className='flex flex-col items-center lg:items-start '>
                    <Link to={"/login"} >Login</Link>
                    <Link to={"/register"} >Register</Link>
                </div>
            )
            }
        </div>


        {/* Copyright */}
        <div className='flex justify-center items-center h-full'>
            <p className='text-eggshell-600 text-xs'>© Via Tranquilla</p>
        </div>
    </div>
  )
}

export default Footer