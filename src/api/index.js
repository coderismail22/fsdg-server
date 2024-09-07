// src/api/index.js
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import blogRoutes from "../routes/blog.route.js";
import adminRoutes from "../routes/admin.route.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(express.static("uploads"));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error(err));

app.use("/", (req, res) => {
  res.send("Server is running");
});
app.use("/api/blogs", blogRoutes);
app.use("/api/admin", adminRoutes);

export default app;
