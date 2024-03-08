import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function CarForm() {
    const { user } = useContext(AuthContext);
    const seats = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
    const [car, setCar] = useState({
        make: "",
        model: "",
        year: "",
        color: "",
        seats: "",
        image: "",
        creator: user.username,
    });
    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };
    const handleUpload = async (e) => {
        setCar({ ...car, image: url  });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // await createCar(car);
            console.log("Car created");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form action="">
                <label htmlFor="make">Make</label>
                <input
                    type="text"
                    name="make"
                    value={car.make}
                    onChange={handleChange}
                />
                <label htmlFor="model">Model</label>
                <input
                    type="text"
                    name="model"
                    value={car.model}
                    onChange={handleChange}
                />
                <label htmlFor="year">Year</label>
                <input
                    type="text"
                    name="year"
                    value={car.year}
                    onChange={handleChange}
                />
                <label htmlFor="color">Color</label>
                <input
                    type="text"
                    name="color"
                    value={car.color}
                    onChange={handleChange}
                />
                <label htmlFor="seats">Seats</label>
                <select
                    name="seats"
                    value={car.seats}
                    onChange={handleChange}
                >
                    {seats.map((seat) => (
                        <option key={seat} value={seat}>
                            {seat}
                        </option>
                    ))}
                </select>
                <label htmlFor="image">Image</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleUpload}
                />
                <button onClick={handleSubmit}>Create Car</button>
            </form>
        </div>
    )
}