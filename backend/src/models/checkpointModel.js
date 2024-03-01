import mongoose from "mongoose";

const checkpointSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: {
    geolocation: {
      long: { type: Number },
      lat: { type: Number },
    },
  },
  suggestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Checkpoint", checkpointSchema);
