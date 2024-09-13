// src/api/index.js
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import postRoutes from "../routes/post.route.js";
import adminRoutes from "../routes/admin.route.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 5000; //remove in production

app.use(bodyParser.json());
// app.use(express.static("uploads"));

app.use(
  cors({
    origin: "http://localhost:5173",
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

app.use((req, res) => {
  res.status(404).send({ message: "Not Found" });
});
app.use("/", (req, res) => {
  res.send("Server is running");
});

//remove in production
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

export default app;
