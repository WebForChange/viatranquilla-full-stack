import mongoose from "mongoose";
const Schema = mongoose.Schema;

const preferencesSchema = new Schema({
  username: { type: String, required: true, unique: true },
  profilevisibility: {
    strangers: { type: Boolean, default: true },
    friends: { type: Boolean, default: true },
  },
  email: {
    friends: { type: String, default: true },
  },
  picturevisibility: {
    strangers: { type: Boolean, default: true },
  },
  gendervisibility: {
    strangers: { type: Boolean, default: false },
  },
  birthdatevisibility: {
    strangers: { type: Boolean, default: true },
    friends: { type: Boolean, default: true },
  },
  namevisibility: {
    strangers: { type: Boolean, default: true },
  },
  biovisibility: {
    strangers: { type: Boolean, default: true },
  },
  addressvisibility: {
    friends: { type: Boolean, default: true },
  },
  phonevisibility: {
    friends: { type: Boolean, default: true },
  },
  pasttripsvisibility: {
    strangers: { type: Boolean, default: true },
    friends: { type: Boolean, default: true },
  },
});

const Preferences = mongoose.model("Preferences", preferencesSchema);

export default Preferences;
