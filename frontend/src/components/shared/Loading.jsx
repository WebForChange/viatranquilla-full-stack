export default function Loading({loading}) {
    if (!loading) return null;
    return (
        <div>
        Loading...
        </div>
    );
}