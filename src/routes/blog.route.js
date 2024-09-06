// routes/blogRoutes.js
import express from "express";
import { blogControllers } from "../controllers/blog.controller.js";

const router = express.Router();

// Get all blogs
router.get("/", blogControllers.getAllBlogs);

// Get a single blog by ID
router.get("/:id", blogControllers.getBlogById);

// Create a new blog
router.post("/", blogControllers.createBlog);

// Update a blog by ID
router.patch("/:id", blogControllers.updateBlog);

// Delete a blog by ID
router.delete("/:id", blogControllers.deleteBlog);

export default router;
