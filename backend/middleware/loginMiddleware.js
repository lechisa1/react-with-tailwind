// authMiddleware.js
const jwt = require("jsonwebtoken");
const secretKey =  process.env.JWT_SECRET; // Or use process.env.JWT_SECRET

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = user; // decoded token info
    next();
  });
};
