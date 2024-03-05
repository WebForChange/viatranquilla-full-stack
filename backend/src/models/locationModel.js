import mongoose from "mongoose";

const Schema = mongoose.Schema;

const locationSchema = new Schema({
  title: { type: String, required: true, default: "New Location" }, // City or place name
  description: { type: String, default: "Description" },
  checkpoints: {
    type: [{ type: Schema.Types.ObjectId, ref: "Checkpoint" }],
    default: [],
  },
});

const Location = mongoose.model("Location", locationSchema);

export default Location;
