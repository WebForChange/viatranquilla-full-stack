import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

function Hero() {
  const { loggedIn, user } = useContext(AuthContext);
  return (
    <div>
      {!loggedIn 
      ? 
      <div className="hero h-[300px] lg:h-[400px] xl:h-[550px] bg-hero-img bg-cover shadow-xl shadow-delft_blue-100">
      <div className=" bg-delft_blue-100 w-3/4 lg:w-1/2 h-5/6 lg:h-2/3 rounded-3xl bg-opacity-40 backdrop-filter backdrop-blur-sm shadow-sm shadow-rose_taupe-100">
        <div className="hero-content text-center text-neutral-content ">
          <div className="max-w-md text-eggshell-800 pt-4 lg:pt-8 ">
            <h1 className="mb-5 text-3xl lg:text-5xl font-bold">
              Hello Traveller
            </h1>
            <p className="mb-5 font-semibold">
              Welcome to Via Tranquilla. Plan your trips and share your experiences with other travellers.
            </p>
            <button className="w-24 h-12 rounded-lg bg-cambridge_blue-200 border-none hover:bg-cambridge_blue-400 text-eggshell-500">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
      :
      <div className="hero h-[300px] lg:h-[400px] xl:h-[550px] bg-hero-img bg-cover shadow-xl shadow-delft_blue-100">
      <div className=" bg-delft_blue-100 w-3/4 lg:w-1/2 h-5/6 lg:h-2/3 rounded-3xl bg-opacity-40 backdrop-filter backdrop-blur-sm shadow-sm shadow-rose_taupe-100">
        <div className="hero-content text-center text-neutral-content ">
          <div className="max-w-md text-eggshell-800 pt-4 lg:pt-8 ">
            <h1 className="mb-5 text-3xl lg:text-5xl font-bold">
              Hello {user.username}
            </h1>
            <p className="mb-5 font-semibold">
              Welcome back to Via Tranquilla. Plan your trips and share your experiences with other travellers.
            </p>
            <button className="w-24 h-12 rounded-lg bg-cambridge_blue-200 border-none hover:bg-cambridge_blue-400 text-eggshell-500">
              Plan Trips
            </button>
          </div>
        </div>
      </div>
    </div>}
    </div>

  )
}

export default Hero