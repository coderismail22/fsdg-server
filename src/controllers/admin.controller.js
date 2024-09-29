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
      { expiresIn: "7d" }
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Store token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // This cookie cannot be accessed by JavaScript
      secure: isProduction, // Send over HTTPS only in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      sameSite: isProduction ? "none" : "lax", // CSRF protection
      path: "/", // Ensure the cookie is sent for all routes
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkAuth = (req, res) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  // console.log("check auth token", token);
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

// Change Password Controller (Without bcrypt)
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    console.log("admin", admin);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare the old password with the stored one
    if (admin.password !== oldPassword) {
      console.log("incorrect password");
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Update the password to the new password
    admin.password = newPassword;

    await admin.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Password change failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const AdminControllers = {
  adminLogin,
  checkAuth,
  changePassword,
};
