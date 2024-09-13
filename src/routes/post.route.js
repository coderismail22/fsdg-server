// routes/blogRoutes.js
import express from "express";
import { postControllers } from "../controllers/post.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
// import multer from "multer";

const router = express.Router();

// Multer configuration for file storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });
// Upload image route
// router.post("/api/upload", upload.single("image"), (req, res) => {
//   res.json({ url: `${req.file.path}` });
// });

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
