export default function ItemCard({ item }) {
    
    return (
        <div>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.quantity}</p>
            <p>{item.category}</p>
        </div>
    )
}