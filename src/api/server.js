import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import blogRoutes from "../routes/blog.route.js"; // Adjust path if necessary
import cors from "cors";
import { adminLogin } from "../controllers/admin.controller.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static("uploads"));

// Configure CORS with specific options
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this specific origin
    methods: "GET, POST, PUT, DELETE, PATCH", // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error(err));

// Use routes
app.use("/", blogRoutes);
app.use("/", adminLogin);

// Export the app as a serverless function
export default app;
