// controllers/postController.js
import { Post } from "../models/post.model.js";

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

// Create a new post
const createPost = async (req, res) => {
  const author = "Firoj Alam";
  const { label, title, content, imgUrl } = req.body;
  console.log(req.body);
  try {
    const newPost = new Post({ label, title, content, author, imgUrl });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Error while saving post:", err); // Log the exact error
    res
      .status(500)
      .json({ error: "Failed to create post", details: err.message });
  }
};

// Update an existing post by ID
const updatePost = async (req, res) => {
  const { title, label, imgUrl, content, author } = req.body;
  console.log("🚀 ~ updatePost ~ hi", title, label, imgUrl, content, author);

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, label, imgUrl, content, author },
      { new: true }
    );
    console.log("🚀 ~ updatePost ~ updatedPost:", updatedPost);

    if (!updatedPost) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

// Delete a post by ID
const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ error: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};

export const postControllers = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
