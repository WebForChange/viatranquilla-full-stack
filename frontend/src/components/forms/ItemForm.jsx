import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

export default function ItemForm() {
    const { item: populated } = useParams();
    const { user } = useContext(AuthContext);
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
    useEffect(() => {
        if (populated) {
            setItem(populated);
        }
    }, [populated]);

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };
    const handleUpload = async (e) => {
        setItem({ ...item, image: url  });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/items", item);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <form action="">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={handleChange}
                />
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    name="description"
                    value={item.description}
                    onChange={handleChange}
                />
                <label htmlFor="quantity">Quantity</label>
                <input
                    type="text"
                    name="quantity"
                    value={item.quantity}
                    onChange={handleChange}
                />
                <label htmlFor="category">Category</label>
                <select
                    name="category"
                    value={item.category}
                    onChange={handleChange}
                >
                    <option value="">Select a category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <label htmlFor="image">Image</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleUpload}
                />
                {populated ? <button onClick={handleUpdate}>Update</button> : <button onClick={handleSubmit}>Submit</button>}
            </form>
        </div>
    )
}