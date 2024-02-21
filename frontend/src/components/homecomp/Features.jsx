import React from 'react'

function Features() {
  return (
    <div className="features">
    
    <div className="flex flex-col mx-auto justify-center items-center">
    <div className="card lg:card-side bg-delft_blue-300 shadow-xl w-2/3 my-8">
      <figure>
        <img
          src="https://www.thespruce.com/thmb/i4MqH88_cir5pwUpSD9xrZZBR1c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Lotusbelle-outback-deluxe-tent-viasmallspaces.about.com-56a888335f9b58b7d0f31ba1.jpg"
          alt="Tent"
          className="max-w-[500px]"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-cambridge_blue">Glamping!</h2>
        <p className="text-cambridge_blue">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
        <div className="card-actions justify-end">
          <button className="btn bg-cambridge_blue-300 border-none">Listen</button>
        </div>
      </div>
    </div>
    </div>
  </div>

  )
}

export default Features