import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ItemCard({ item, deleteItem }) {

    
    const handleDelete = () => {
        deleteItem(item._id);
    };

    const handleEdit = (itemId) => {
        return `/items/edit/${itemId}`;
    };

    return (
        <div className="flex card w-80 md:w-1/36 glass">
            <div className='flex p-3 ml-2 card-body'>
                <h3 className="card-title text-burnt_sienna-600 text-2xl font-bold">{item.name}</h3>
                <p className='text-sunset-700'>{item.description}</p>
                <p className='text-sunset-700'>{item.quantity}</p>
                <p className='text-sunset-700'>{item.category}</p>
                <div className='flex text-cambridge_blue-600 gap-5'>
                    <button onClick={handleDelete}>Delete</button>
                    <Link to={handleEdit(item._id)}>Edit</Link>
                </div>
            </div>
        </div>
    );
}