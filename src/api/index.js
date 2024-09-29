// src/api/index.js
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import postRoutes from "../routes/post.route.js";
import adminRoutes from "../routes/admin.route.js";
import emailRoutes from "../routes/email.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

// const allowedOrigins = [
//   "http://localhost:5173", // Local development,
//   "http://localhost:3000", // Local development,
//   "http://localhost:5000", // Local development,
//   "https://fsdgbd2.netlify.app",
//   "https://fsdgbd.netlify.app",
//   "https://www.fsdgbd.org", // Deployed frontend URL
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     methods: "GET, POST, PUT, DELETE, PATCH",
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: true, // Allow all origins
    methods: "GET, POST, PUT, DELETE, PATCH",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error(err));

app.use("/api/posts", postRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/sendmail", emailRoutes);

app.use((req, res) => {
  res.status(404).send({ message: "API Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

export default app;
