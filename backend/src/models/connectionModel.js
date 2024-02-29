import mongoose from "mongoose";
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
  from: { type: String },
  to: { type: String },
  startDateTime: { type: Date },
  startDateTime: { type: Date },
  mode: { type: String },
});

const Connection = mongoose.model("Connection", connectionSchema);
export default Connection;
