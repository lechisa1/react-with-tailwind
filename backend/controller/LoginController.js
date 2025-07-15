const db = require("../db/config");
const bcrypyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const { v4: uuidv4 } = require("uuid");
const SECRET_KEY = process.env.JWT_SECRET;
// const { validationResult } = require("express-validator");
const session = require("express-session");
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = results[0];
      const checkPassword = await bcrypyt.compare(password, user.password);
      if (!checkPassword) {
        return res.status(404).json({ error: "Invalid Email Or Password" });
      }
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
          password: user.password,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
      );
      // Store user ID in session
      return res.status(200).json({
        message: "Login successful",
        token: token,
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    }
  );
};
exports.logout = (req, res) => {
  return res.status(200).json({ message: "Logout successful" });
};
