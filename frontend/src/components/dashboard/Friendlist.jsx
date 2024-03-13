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
      setFriends(response.data);
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
          <ul className="flex flex-row justify-start">
            {friends.map((friend, index) => {
              // <li key={index}>{friend}</li>;
              if (!friends) return;
              return (
                <li key={index} className="flex flex-col items-center ">
                  <img
                    src={
                      friend.profilePicture ||
                      "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    }
                    alt="avatar"
                    className="w-20 h-20 rounded-full mb-2"
                  />
                  <span className="text-white font-semibold text-xl">
                    {friend.username}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
