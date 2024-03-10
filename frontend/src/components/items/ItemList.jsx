import ItemCard from "./ItemCard";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ItemList({ username }) {
    const [items, setItems] = useState(null);
    async function getItems() {
        try {
            const res = await axios.get(`http://localhost:300/items/${username}`);
            setItems(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getItems();
    }, []);


    return (
        <div>
            {!items ? <h1>No Data...</h1> :
                items.map((item) => {
                    return (
                        <ItemCard key={item.id} item={item} />
                    );
                })
            }
        </div>
    )
}