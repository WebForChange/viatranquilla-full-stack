import mongoose from "mongoose";
const Schema = mongoose.Schema;

const carSchema = new mongoose.Schema({
  make: { type: String, required: true, default: "" },
  model: { type: String, required: true, default: "" },
  year: { type: Number, required: true, default: "" },
  color: { type: String, required: true, default: "" },
  seats: { type: Number, required: true, default: "" },
  image: { link: { type: String, default: "" } },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

const Car = mongoose.model("Car", carSchema);

export default Car;
