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
    if (username) getFriends();
    else console.log("no username");
  }, [username]);

  return (
    <div className="m-8">
      <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-sunset-400">
        Your Friends
      </h3>

      <div className="text-white text-xl lg:text-2xl font-bold">
        {friends.length === 0 ? (
          <p>Your new friends will appear here.</p>
        ) : (
          <ul>
            {friends.map((friend, index) => {
              return <li key={index}>{friend}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
