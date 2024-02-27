import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      message: { type: String },
      timestamp: { type: Date },
    },
  ],
});

export default mongoose.model("Chat", chatSchema);
