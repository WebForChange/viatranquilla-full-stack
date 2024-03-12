import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ItemForm() {
    const { _id } = useParams();
    const { user } = useContext(AuthContext);
    async function getItemById() {
        try {
            const res = await axios.get(`http://localhost:3000/items/${_id}`);
            setItem(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (_id) {
            getItemById();
            console.log(_id);
        }
    }
    , [_id]);

    const categories = [
        "Accessories",
        "Books",
        "Clothing",
        "Electronics",
        "Entertainment and Relaxation",
        "Equipment",
        "Furniture",
        "Maintenance and Repair",
        "Navigation and Communication",
        "Outdoors",
        "Personal Items",
        "Safety Gear",
        "Safety and Emergency Equipment",
        "Sport Equipment",
        "Tools",
        "Other"
    ];
    const [item, setItem] = useState({
        name: "",
        description: "",
        image: "",
        quantity: "",
        category: "",
        visibilty: true,
        creator: user.username,
    });

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };
    const handleUpdate = async (e) => {
        setItem({ ...item, image: url  });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/items/item", item, {
                withCredentials: true
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="text-eggshell-600 w-full h-screen p-4">
            <div><h2 className="mx-8 text-center text-1xl lg:text-2xl font-bold mb-4 text-sunset-400">Create a new Item</h2></div>
            <form className="flex flex-col gap-4 justify-between items-center">

                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={handleChange}
                    className="p-1 rounded text-delft_blue-100"
                />
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    name="description"
                    value={item.description}
                    onChange={handleChange}
                    className="p-1 rounded text-delft_blue-100"
                />
                <label htmlFor="quantity">Quantity:</label>
                <input
                    type="text"
                    name="quantity"
                    value={item.quantity}
                    onChange={handleChange}
                    className="p-1 rounded text-delft_blue-100"
                />
                <label htmlFor="category">Category:</label>
                <select
                    name="category"
                    value={item.category}
                    onChange={handleChange}
                    className="p-1 rounded text-delft_blue-100"
                >
                    <option value="" className="p-1 rounded">Select a category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                {/* <label htmlFor="image">Image</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleUpdate}
                /> */}
                {_id ? <button onClick={handleUpdate} className="btn bg-cambridge_blue-500 text-delft_blue-100 border-none hover:bg-cambridge_blue-500">Update</button> : <button onClick={handleSubmit} className="btn bg-cambridge_blue-500 text-delft_blue-100 border-none hover:bg-cambridge_blue-500">Submit</button>}
            </form>
        </div>
    )
}