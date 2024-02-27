import mongoose from "mongoose";

const checkpointSchema = new mongoose.Schema({
  checkpoint: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  location: { type: Geolocation, required: true },
});

export default mongoose.model("Checkpoint", checkpointSchema);
