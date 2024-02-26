import mongoose from "mongoose";
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  id: { type: String },
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
  createdTrips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
  joinedTrips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
