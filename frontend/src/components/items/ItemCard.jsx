import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ItemCard({ item }) {
    async function deleteItem() {
            try {
                const res = await axios.delete(`http://localhost:3000/items/${item.id}`, {
                    withCredentials: true,
                });
            } catch (error) {
                console.log(error);
            }
        }
    function handleDelete(e) {
        e.preventDefault();
        deleteItem();
    }

    function handleEdit() {
        return (
            <Link to={`/items/edit/${item}`}></Link>
        )
    }

    return (
        <div>
            <div>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>{item.quantity}</p>
                <p>{item.category}</p>
            </div>
            <div>
                <button onClick={handleDelete(e)}></button>
                <button onClick={handleEdit()}></button>
            </div>
        </div>
    )
}