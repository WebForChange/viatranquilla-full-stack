import mongoose from "mongoose";
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
  from: {
    city: { type: String, default: "Place A" },
    address: { type: String, default: "Address A" },
    geolocation: {
      long: { type: String, default: null },
      lat: { type: String, default: null },
    },
  },
  to: {
    city: { type: String, default: "Place B" },
    address: { type: String, default: "Address B" },
    geolocation: {
      long: { type: String, default: null },
      lat: { type: String, default: null },
    },
  },
  startDate: { type: String, default: null },
  startDateTime: { type: String, default: null },
  endDate: { type: String, default: null },
  endDateTime: { type: String, default: null },
  mode: { type: String, default: null },
});

const Connection = mongoose.model("Connection", connectionSchema);
export default Connection;
