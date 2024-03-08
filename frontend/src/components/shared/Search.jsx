import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Search() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedUserIndex, setSelectedUserIndex] = useState(-1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:3000/users");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setShowSuggestions(true);
        setSelectedUserIndex(-1);
    };

    const handleSelectUser = (username) => {
        setShowSuggestions(false);
        navigate(`/user/${username}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (selectedUserIndex !== -1) {
                const selectedUser = filteredUsers[selectedUserIndex];
                handleSelectUser(selectedUser.username);
            } else {
                navigate(`/user/${search}`);
            }
        } else if (e.key === "ArrowDown") {
            setSelectedUserIndex((prevIndex) => (prevIndex < filteredUsers.length - 1 ? prevIndex + 1 : prevIndex));
        } else if (e.key === "ArrowUp") {
            setSelectedUserIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
        }
    };

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div style={{ position: "relative" }}>
                <input
                    type="text"
                    placeholder="Search for users"
                    onChange={handleSearch}
                    onKeyDown={handleKeyDown}
                    value={search}
                    className="input input-bordered w-24 md:w-auto bg-black bg-opacity-5 text-white shadow-lg shadow-slate_gray-100 rounded-full h-10"
                />
                {showSuggestions && (
                    <div style={{ position: "absolute", top: "100%", left: 0, width: "100%", zIndex: 2 }}>
                        <ul style={{ backgroundColor: "black", color: "white", padding: "0.5rem", borderRadius: "0.5rem" }}>
                            {filteredUsers.map((user, index) => (
                                <li key={user.id}>
                                    <Link
                                        to={`/user/${user.username}`}
                                        onClick={() => handleSelectUser(user.username)}
                                        style={{ textDecoration: "none", color: selectedUserIndex === index ? "blue" : "white" }}
                                    >
                                        {user.username}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
