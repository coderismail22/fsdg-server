// controllers/blogController.js
import { Blog } from "../models/blog.model.js";

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

// Create a new blog
const createBlog = async (req, res) => {
  const { title, content, author } = req.body;
  console.log(req.body);
  try {
    const newBlog = new Blog({ title, content, author });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    console.error("Error while saving blog:", err); // Log the exact error
    res
      .status(500)
      .json({ error: "Failed to create blog", details: err.message });
  }
};

// Update an existing blog by ID
const updateBlog = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true }
    );
    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog" });
  }
};

// Delete a blog by ID
const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
};

export const blogControllers = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
