import React from "react";


function Header({trip}) {
  console.log("Trip in header", trip);
  return (
    <div className="hero h-[300px] lg:h-[400px] xl:h-[550px] shadow-xl shadow-delft_blue-100 mb-12">
      <img
        src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Paris"
        className="object-cover w-full h-full sm:max-h-[350px] lg:max-h-[550px]"
      />
      <div className=" bg-delft_blue-100 w-3/4 lg:w-1/2 h-auto rounded-3xl bg-opacity-40 backdrop-filter backdrop-blur-sm shadow-sm shadow-rose_taupe-100">
        <div className="justify-between items-start text-neutral-content flex flex-col p-4 lg:p-8">
          <div className="max-w-md text-eggshell-800 flex flex-col">
            <h1 className="mb-5 text-3xl lg:text-5xl font-bold">
              Trip to Paris
            </h1>
            <p className="mb-5 font-semibold">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi.
            </p>
            <div>
              <p>Start: 23.05.2024</p>
              <p>End: 30.05.2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
