const express = require("express");
const db = require("../../db/config");
const bcrypt = require("bcrypt");
exports.registerUser = async(req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      phone,
      email,
      password,
      department_id,
      role,
    } = req.body;
                  const hashedPassword= await bcrypt.hash(req.body.password,10);
const departmentId=parseInt(department_id,10)
    if (!departmentId ||departmentId < 1) {
      return res
        .status(400)
        .json({ error: "Department ID must be a positive integer" });
    }
    if (departmentId) {
      db.query(
        "SELECT * FROM departments WHERE id = ?",
        [departmentId],
        (err, results) => {
          if (err) {
            console.error("Error checking department:", err);
            return res.status(500).json({ error: "Database error" });
          }
          if (results.length === 0) {
            return res.status(404).json({ error: "Department not found" });
          }
          db.query(
            "SELECT *FROM users WHERE email=?",
            [email],
            (error, result) => {
              if (error) {
                console.error("Error checking user:", error);
                return res.status(500).json({ error: "Database error" });
              }
              if (result.length > 0) {
                return res.status(400).json({ error: "User already exists" });
              }

              const sql =
                "INSERT INTO users (first_name, last_name, username, phone, email, password, department_id, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
              const values = [
                first_name,
                last_name,
                username,
                phone,
                email,
                hashedPassword,
                departmentId,
                role,
              ];
              db.query(sql, values, (error, result) => {
                if (error) {
                  console.error("Error inserting user:", error);
                  return res
                    .status(500)
                    .json({ error: "Failed to register user" });
                }
                return res.status(201).json({
                  message: "User registered successfully",
                  user: {
                    id: result.insertId,
                    first_name,
                    last_name,
                    username,
                    phone,
                    email,
                    departmentId,
                    role,
                  },
                });
              });
            }
          );
        }
      );
    }
    
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Failed to register user" });
  }
};
exports.getAllUsers = (req, res) => {
  try {
    const sql = `
  SELECT users.*, departments.name AS department_name
  FROM users
  JOIN departments ON users.department_id = departments.id
  WHERE users.deleted = 0
`;

    db.query(sql, (error, results) => {
      if (error){ console.error("Error fetching users:", error);
      return res.status(500).json({ error: "Database error" })};
      if (results.length === 0) {
        return res.status(404).json({ message: "No user found!!" });
      }
      return res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
};
exports.getUserById = (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    db.query("SELECT * FROM users WHERE id = ?", [userId], (error, results) => {
      if (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(results[0]);
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Failed to fetch user" });
  }
};
exports.updateUser = (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ error: "Id is Required" });
  }

  db.query("SELECT * FROM users WHERE id = ?", [userId], async (error, results) => {
    if (error) {
      console.error("Error checking user:", error);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingUser = results[0];
    const {
      first_name = existingUser.first_name,
      last_name = existingUser.last_name,
      username = existingUser.username,
      phone = existingUser.phone,
      email = existingUser.email,
      password = existingUser.password, // initially set to existing (will hash if updated)
      department_id = existingUser.department_id,
      role = existingUser.role,
    } = req.body;

    try {
      let hashedPassword = password;
      // Only hash if password is changed
      if (req.body.password && req.body.password !== existingUser.password) {
        hashedPassword = await bcrypt.hash(req.body.password, 10);
      }

      db.query(
        "UPDATE users SET first_name = ?, last_name = ?, username = ?, phone = ?, email = ?, password = ?, department_id = ?, role = ? WHERE id = ?",
        [
          first_name,
          last_name,
          username,
          phone,
          email,
          hashedPassword,
          department_id,
          role,
          userId,
        ],
        (err, result) => {
          if (err) {
            console.error("Error updating user:", err);
            return res.status(500).json({ error: "Database error" });
          }
          return res.status(200).json({
            message: "User updated successfully",
            user: {
              id: userId,
              first_name,
              last_name,
              username,
              phone,
              email,
              department_id,
              role,
            },
          });
        }
      );
    } catch (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ error: "Failed to hash password" });
    }
  });
};
exports.deleteUser = (req, res) => {
  try {
    const userId = req.params.id;
    // if (!userId || isNaN(userId)) {
    //   return res.status(400).json({ error: "Invalid user ID" });
    // }
    db.query("DELETE FROM users WHERE id = ?", [userId], (error, results) => {
      if (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "User deleted successfully" });
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Failed to delete user" });
  }
};
exports.softDeleteUser = (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    db.query(
      "UPDATE users SET deleted = 1 WHERE id = ?",
      [userId],
      (error, results) => {
        if (error) {
          console.error("Error soft deleting user:", error);
          return res.status(500).json({ error: "Database error" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User soft deleted successfully" });
      }
    );
  } catch (error) {
    console.error("Error soft deleting user:", error);
    return res.status(500).json({ error: "Failed to soft delete user" });
  }
};

exports.softlyDeletedUsers = (req, res) => {
  try {
    db.query("SELECT * FROM users WHERE deleted = 1", (error, results) => {
      if (error) {
        console.error("Error fetching soft-deleted users:", error);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "No soft-deleted users found" });
      }
      return res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error fetching soft-deleted users:", error);
    return res.status(500).json({ error: "Failed to fetch soft-deleted users" });
  }
}


