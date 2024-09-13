import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token (Make sure to replace 'your-secret-key' with an actual secret)
    const token = jwt.sign({ id: admin._id, role: admin.role }, 'your-secret-key', { expiresIn: '1h' });

    // Send token to the client
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
