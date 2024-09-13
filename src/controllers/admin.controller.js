import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";

// Admin Login Controller
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Store token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // This cookie cannot be accessed by JavaScript
      secure: process.env.NODE_ENV === "production", // Send over HTTPS only in production
      maxAge: 3600000, // Token expiration time
      sameSite: "None", // Protect from CSRF attacks
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkAuth = (req, res) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: "Authenticated", user: decoded });
  } catch (err) {
    res.status(401).json({ message: "Token invalid or expired" });
  }
};

export const AdminControllers = {
  adminLogin,
  checkAuth,
};
