import ItemCard from "./ItemCard";
import { useState, useEffect } from "react";

export default function ItemList({ user }) {
    const [items, setItems] = useState(null);
    async function getItems() {
        const res = await fetch(`http://localhost:3000//items/${user}`);
        const data = await res.json();
        setItems(data);
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