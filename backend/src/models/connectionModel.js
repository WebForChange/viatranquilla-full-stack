import mongoose from "mongoose";
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
  from: { type: String, required, default: "Place A" },
  to: { type: String, required, default: "Place B" },
  startDateTime: { type: Date, default: null },
  startDateTime: { type: Date, default: null },
  mode: { type: String, default: null },
});

const Connection = mongoose.model("Connection", connectionSchema);
export default Connection;
