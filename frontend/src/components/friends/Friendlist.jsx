import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import axios from "axios";

export default function Friendlist({ username }) {
  const [friends, setFriends] = useState([]);
  // console.log("friendlist",username);

  async function getFriends() {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/${username}/friends`
      );
      // console.log("friendlist response",response.data);
      setFriends(response.data.map(({ username, profilePicture }) => username));
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getFriends();
  }, [username]);

  return (
    <div className="m-8">
      <h3 className="text-2xl lg:text-4xl font-bold mb-4 text-sunset-400">
        Your Friends
      </h3>

      <p className="text-white text-xl font-bold">
        {friends.length === 0 ? (
          <p>Du hast noch keine Freunde.</p>
        ) : (
          <ul>
            {friends.map((friend, index) => {
              return <li key={index}>{friend}</li>;
            })}
          </ul>
        )}
      </p>
    </div>
  );
}
