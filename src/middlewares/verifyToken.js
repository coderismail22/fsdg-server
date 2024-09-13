import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key"); // Use the same secret key
    req.user = decoded; // Attach the decoded user data to the request
    next(); // Proceed to the next middleware or controller
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized: Invalid token" });
  }
};

export default verifyToken;
