import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
