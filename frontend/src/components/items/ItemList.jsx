// ItemList.js
import ItemCard from "./ItemCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ItemList({ username }) {
    const [items, setItems] = useState(null);
    async function getItems() {
        try {
            const res = await axios.get(`http://localhost:3000/items/${username}`, {
                withCredentials: true
            });
            setItems(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getItems();
    }, [username]);

    const deleteItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:3000/items/${itemId}`, {
                withCredentials: true,
            });
            getItems();
        } catch (error) {
            console.log("Error deleting item:", error);
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row md:flex-wrap gap-8 my-12 justify-center">
            <Link to="/newitem">
                <button className="mt-4 w-340  px-7 py-3 rounded-lg bg-delft_blue-300 border-none hover:bg-cambridge_blue-400 text-eggshell-500 font-semibold text-xl">
                Create new Item
                </button>
            </Link>
            </div>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-8 my-12 justify-center">
            {!items ? <h1>No Items...</h1> 
            :
            items.map((item) => {
                return (
                    <ItemCard key={item._id} item={item} deleteItem={deleteItem} />
                    );
                })
            }
        </div>
            </>
    )
}
