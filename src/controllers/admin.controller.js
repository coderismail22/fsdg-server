import { Admin } from "../models/admin.model.js";

// Admin Login Controller (without hashing)
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });

    // Check if admin exists
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare plain text password (since you are not using hashing)
    if (admin.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // On successful login
    res.status(200).json({ message: "Login successful", role: admin.role });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
