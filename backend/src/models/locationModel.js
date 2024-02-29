import mongoose from "mongoose";

const Schema = mongoose.Schema;

const locationSchema = new Schema({
  title: { type: String, required: true, unique: true }, // City or place name
  description: { type: String, required: true },
  checkpoints: [{ type: Schema.Types.ObjectId, ref: "Checkpoint" }],
});

const Location = mongoose.model("Location", locationSchema);

export default Location;
