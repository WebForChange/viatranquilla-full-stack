import ItemCard from "./ItemCard";
import { useState, useEffect } from "react";
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

    return (
        <div className="flex flex-col md:flex-row md:flex-wrap gap-8 my-12 justify-center">
            {!items ? <h1>No Items...</h1> 
            :
                items.map((item) => {
                    return (
                        <ItemCard key={item.id} item={item} onDelete={handleDelete} />
                    );
                })
            }
        </div>
    )
}