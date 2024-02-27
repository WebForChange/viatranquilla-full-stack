import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tripSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    invitation: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    pickupAdress: { address: { type: String },geolocation: { type: Schema.Types.ObjectId, ref: "Geolocation" }},
    image: { link: { type: String },fileType: { type: String }},
    checkpoints: { type: String },
    connections: { type: String },
    publishedDate: { type: Date },
    creator: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps:true }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;