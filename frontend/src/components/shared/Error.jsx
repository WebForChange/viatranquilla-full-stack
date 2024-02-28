export default function Error({error}) {
    if (!error) return null;
    return (
        <div>
        {error}
        </div>
    );
}