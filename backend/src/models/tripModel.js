import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tripSchema = new Schema(
  {
    title: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    state: { type: String, default: "active" },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    description: { type: String, default: "" },
    invitation: { type: String },
    pickupAdress: {
      address: { type: String },
      geolocation: {
        long: { type: Number },
        lat: { type: Number },
      },
    },
    image: { link: { type: String } },
    checkpoints: [{ type: Schema.Types.ObjectId, ref: "Location" }],
    connections: [{ type: Schema.Types.ObjectId, ref: "Connection" }],
    publishedDate: { type: Date },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
