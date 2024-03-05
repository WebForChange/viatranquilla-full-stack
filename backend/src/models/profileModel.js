import mongoose from "mongoose";
const Schema = mongoose.Schema;

const profileSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  friends: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
  friendRequests: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  birthDate: { type: Date, default: "" },
  phone: { type: String, default: "" },
  street: { type: String, default: "" },
  houseNumber: { type: String, default: "" },
  zip: { type: String, default: "" },
  city: { type: String, default: "" },
  country: { type: String, default: "" },
  state: { type: String, default: "" },
  profilePicture: { type: String, default: "" },
  bio: { type: String, default: "" },
  createdTrips: {
    type: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
    default: [],
  },
  joinedTrips: {
    type: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
    default: [],
  },
  invitedToTrips: {
    type: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
    default: [],
  },
  travelPreferences: {
    planning: { type: String, default: "" },
    earlyBird: { type: Boolean, default: false },
    mtBeachCity: { type: String, default: "" },
    cookEatOut: { type: String, default: "" },
    blala: { type: String, default: "" },
  },
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
