// routes/blogRoutes.js
import express from "express";
import { postControllers } from "../controllers/post.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// Get all blogs
router.get("/", postControllers.getAllPosts);

// Get a single blog by ID
router.get("/:id", postControllers.getPostById);

// Create a new blog
router.post("/", postControllers.createPost);

// Update a blog by ID
router.patch("/:id", postControllers.updatePost);

// Delete a blog by ID
router.delete("/:id", postControllers.deletePost);

export default router;
