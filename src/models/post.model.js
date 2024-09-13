// models/Blog.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  label: {
    type: "string",
  },
  title: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Post = mongoose.model("Post", postSchema);
