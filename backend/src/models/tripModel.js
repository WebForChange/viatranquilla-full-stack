import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tripSchema = new Schema(
  {
    title: { type: String, required: true, default: "New Trip" },
    startDate: { type: Date },
    endDate: { type: Date },
    state: { type: String, default: "active" },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    description: { type: String, default: "" },
    invitation: { type: String, default: "" },
    pickupAdress: {
      address: { type: String, default: "" },
      geolocation: {
        long: { type: Number },
        lat: { type: Number },
      },
    },
    image: { link: { type: String, default: "" } },
    checkpoints: {
      type: [{ type: Schema.Types.ObjectId, ref: "Location" }],
      default: [],
    },
    connections: {
      type: [{ type: Schema.Types.ObjectId, ref: "Connection" }],
      default: [],
    },
    publishedDate: { type: Date },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
