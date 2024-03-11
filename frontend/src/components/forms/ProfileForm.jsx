import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthProvider";
import { DataContext } from "../../contexts/DataContextProvider";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function ProfileForm() {
  const { user } = useContext(AuthContext);
  const username = user.username;
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // user.id is the id of the logged in user from login state user.id

  const [userData, setUserData] = useState({
    id: user.id,
    firstName: "",
    lastName: "",
    birthDate: null,
    phone: "",
    street: "",
    houseNumber: "",
    zip: "",
    city: "",
    country: "",
    state: "",
    profilePicture: null,
    bio: "",
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${username}`
        );
        console.log("response.data: ", response.data);
        setUserData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchUserData();
  }, [username]);


  function handleChange(event) {
    setUserData({
      ...userData,
      [event.target.id]: event.target.value,
    });
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Update profilePicture in the state
    setUserData({
      ...userData,
      profilePicture: selectedFile, // Set to null or an empty string if no file is selected
    });
  }

  // post api missing
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", userData.id);
      formData.append("firstName", userData.firstName);
      formData.append("lastName", userData.lastName);
      formData.append("birthDate", userData.birthDate);
      formData.append("phone", userData.phone);
      formData.append("street", userData.street);
      formData.append("houseNumber", userData.houseNumber);
      formData.append("zip", userData.zip);
      formData.append("city", userData.city);
      formData.append("country", userData.country);
      formData.append("state", userData.state);
      formData.append("profilePicture", file);
      formData.append("bio", userData.bio);

      const response = await axios.put(
        `http://localhost:3000/users/edit/${username}`,
        formData,
        {
          withCredentials: true, // Include this if you are using cookies for authentication
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "http://localhost:5173",
          },
          body: JSON.stringify(userData),
        }
      );
      console.log(response.data);
      console.log(response);

      navigate(`/user/${username}`);
      toast.success("You successfully edit your Profile!");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="p-8 text-eggshell-700 flex justify-center items-center">
      <form className="flex flex-col space-y-4 justify-between">
        <h2 className="text-3xl text-sunset-400">Hello {username}</h2>
        <div className="flex flex-col">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstName"
            className="rounded p-2 text-delft_blue-100"
            value={userData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastName"
            className="rounded p-2 text-delft_blue-100"
            value={userData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="birthdate">Birth Date</label>
          <input
            type="date"
            id="birthDate"
            className="rounded p-2 text-delft_blue-100"
            value={userData.birthDate}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            className="rounded p-2 text-delft_blue-100"
            value={userData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            className="rounded p-2 text-delft_blue-100"
            value={userData.street}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="housenumber">House Number</label>
          <input
            type="text"
            id="houseNumber"
            className="rounded p-2 text-delft_blue-100"
            value={userData.houseNumber}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="zip">ZIP</label>
          <input
            type="text"
            id="zip"
            className="rounded p-2 text-delft_blue-100"
            value={userData.zip}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            className="rounded p-2 text-delft_blue-100"
            value={userData.city}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            className="rounded p-2 text-delft_blue-100"
            value={userData.country}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            className="rounded p-2 text-delft_blue-100"
            value={userData.state}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="profilepicture">Profile Picture</label>
          <input type="file" id="profilePicture" onChange={handleFileChange} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            className="rounded p-2 text-delft_blue-100"
            rows="10"
            cols="30"
            value={userData.bio}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn w-1/2 bg-cambridge_blue-400 hover:bg-cambridge_blue-600 border-none"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
