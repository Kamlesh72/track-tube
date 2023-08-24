import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  youtubelink: { type: String, required: true },
  title: { type: String, required: true },
  totalvideos: { type: Number, required: true },
  completedVideos: { type: Number, default: 0 },
  thumbnail: { type: String, required: true },
  videos: [
    {
      videolink: String,
      isCompleted: Boolean,
      title: String,
      notes: { type: String, default: "" },
    },
  ],
});

export default mongoose.model("Projects", projectSchema);
