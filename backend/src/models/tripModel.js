import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tripSchema = new Schema(
  {
    title: { type: String, default: "New Trip" },
    creator: { type: String, required: true },
    roundtrip: { type: Boolean, default: true },
    startDate: { type: Date },
    endDate: { type: Date },
    state: { type: String, default: "active" },
    participants: { type: [{ type: String }], default: [] },
    description: { type: String, default: "" },
    invitation: { type: String, default: "" },
    pickupAdress: {
      city: { type: String, default: null },
      address: { type: String, default: null },
      geolocation: {
        long: { type: Number },
        lat: { type: Number },
      },
    },
    image: { link: { type: String, default: "" } },
    locations: {
      type: [{ type: Schema.Types.ObjectId, ref: "Location" }],
      default: [],
    },
    checkpoints: {
      type: [{ type: Schema.Types.ObjectId, ref: "Location" }],
      default: [],
    },
    connections: {
      type: [{ type: Schema.Types.ObjectId, ref: "Connection" }],
      default: [],
    },
    publishedDate: { type: Date },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
