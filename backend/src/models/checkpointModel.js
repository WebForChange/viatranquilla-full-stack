import mongoose from "mongoose";
const Schema = mongoose.Schema;

const checkpointSchema = new Schema(
  {
    checkpoint: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    location: { type: Geolocation, required: true },
  },
  { timestamps: true }
);
