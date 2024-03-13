import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";

export default function CarForm() {
    const { user } = useContext(AuthContext);
    const { data } = useParams();
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
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
    useEffect(() => {
        if (data) {
            setEdit(true);
            setCar(data);
        }
    }
    , []);

    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };
    const handleUpload = async (e) => {
        setCar({ ...car, image: url  });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (edit) {
            try {
                const res = await axios.put(`http://localhost:3000/items/vehicles/${data.id}`, car, {
                    withCredentials: true
                });
                navigate("/dashboard");
            toast.success("You have successfully created your Vehicle!", {
            position: "top-center"
          });
            }
            catch (error) {
                console.log(error);
            }
        } else {
            try {
                const res = await axios.post("http://localhost:3000/items/vehicles", car, {
                    withCredentials: true
                });
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="text-eggshell-600 w-full h-screen p-4">
            <form action="" className="flex flex-col gap-4 justify-between items-center">
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
                {/* <label htmlFor="image">Image</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleUpload}
                /> */}
                {!edit ? (
                    <button onClick={handleSubmit} className="btn bg-cambridge_blue-500 text-delft_blue-100 border-none hover:bg-cambridge_blue-500">Add Car</button>
                ) : (
                    <button onClick={handleSubmit} className="btn bg-cambridge_blue-500 text-delft_blue-100 border-none hover:bg-cambridge_blue-500">Edit Car</button>
                )}
            </form>
        </div>
    )
}