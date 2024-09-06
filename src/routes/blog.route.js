// routes/blogRoutes.js
import express from "express";
import { blogControllers } from "../controllers/blog.controller.js";
import multer from "multer";

const router = express.Router();


// Multer configuration for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

const upload = multer({ storage });


// Upload image route
router.post("/api/upload", upload.single("image"), (req, res) => {
  res.json({ url: `${req.file.path}` });
});

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
