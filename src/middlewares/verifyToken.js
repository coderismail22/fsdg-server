// Middleware to protect routes
const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt; // Get the token from cookies

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Add the user data to the request
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

export default verifyToken;
