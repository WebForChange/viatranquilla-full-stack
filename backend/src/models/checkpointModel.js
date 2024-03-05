import mongoose from "mongoose";

const checkpointSchema = new mongoose.Schema({
  title: { type: String, required: true, default: "New Checkpoint" },
  location: {
    geolocation: {
      long: { type: Number, default: null },
      lat: { type: Number, default: null },
    },
  },
  suggestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

export default mongoose.model("Checkpoint", checkpointSchema);
