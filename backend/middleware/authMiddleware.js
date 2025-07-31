import jwt from "jsonwebtoken";

// Middleware to protect routes
export default authenticateToken = (req, res, next) => {
  // 1. Access the cookie
  const token = req.cookies.jwtToken; // 'jwtToken' is the name of your cookie

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  // 2. Verify the JWT
  // Use the same secret key you used to sign the token when issuing it
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Token is invalid (e.g., expired, malformed, wrong signature)
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    // If verification is successful, 'user' will contain the payload
    // You can attach the user payload to the request object for later use in routes
    req.user = user; // e.g., req.user = { id: 'userId123', email: '...', roles: [...] }
    next(); // Proceed to the next middleware or route handler
  });
};
