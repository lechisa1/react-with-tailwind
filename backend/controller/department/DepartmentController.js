const db = require("../../db/config");

exports.registerDepartment = (req, res) => {
  const { name, description, director_id } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.query(
    "SELECT * FROM departments WHERE name = ?",
    [name],
    (err, results) => {
      if (err) {
        console.error("Error checking department:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: "Department already exists" });
      }

      const sql =
        "INSERT INTO departments (name, description, director_id) VALUES (?, ?, ?)";
      const values = [name, description, director_id];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error("Error inserting department:", err);
          return res
            .status(500)
            .json({ error: "Failed to register department" });
        }

        return res.status(201).json({
          message: "Department registered successfully",
          department: {
            id: result.insertId,
            name,
            description,
            director_id,
          },
        });
      });
    }
  );
};
exports.getAllDepartments = (req, res) => {
  db.query("SELECT * FROM departments WHERE deleted=0", (err, results) => {
    if (err) {
      console.error("Error fetching departments:", err);
      return res.status(500).json({ error: "Database error" });
    }

    return res.status(200).json(results);
  });
};
exports.updateDepartment = (req, res) => {
  const departmentId = req.params.id;

  if (!departmentId || isNaN(departmentId)) {
    return res.status(400).json({ error: "Invalid department ID" });
  }

  db.query(
    "SELECT * FROM departments WHERE id = ?",
    [departmentId],
    (err, results) => {
      if (err) {
        console.error("Error fetching department:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Department not found" });
      }

      const existing = results[0];
      const name = req.body.name || existing.name;
      const description = req.body.description || existing.description;
      const director_id = req.body.director_id || existing.director_id;

      const updateSql =
        "UPDATE departments SET name = ?, description = ?, director_id = ? WHERE id = ?";
      const values = [name, description, director_id, departmentId];

      db.query(updateSql, values, (err, result) => {
        if (err) {
          console.error("Error updating department:", err);
          return res.status(500).json({ error: "Database error" });
        }

        return res.status(200).json({
          message: "Department updated successfully",
          department: {
            id: departmentId,
            name,
            description,
            director_id,
          },
        });
      });
    }
  );
};
exports.softDeleteDepartment = (req, res) => {
  try {
    const depId = req.params.id;
    if (!depId || isNaN(depId)) {
      return res.status(400).json({ error: "Invalid department ID" });
    }
    db.query(
      "SELECT *FROM departments WHERE id=?",
      [depId],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: "Database Error" });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "Department not found" });
        }
        const sql = "UPDATE departments SET deleted=1 WHERE id=?";
        db.query(sql, [depId], (error, results) => {
          if (error) {
            console.error("Error soft deleting department:", error);
            return res
              .status(500)
              .json({ error: "Failed to soft delete department" });
          }
          return res
            .status(200)
            .json({ message: "Department soft deleted successfully" });
        });
      }
    );
  } catch (error) {
    console.error("Error deleting department:", error);
    return res.status(500).json({ error: "Failed to delete department" });
  }
};

exports.permanentDepartmentDelete = (req, res) => {
  try {
    const depId = req.params.id;
    if (!depId && isNaN(depId)) {
      return res.status(400).json({ error: "Invalid department ID" });
    }
    const sql = "DELETE FROM departments WHERE id=?";
    db.query(sql, [depId], (error, results) => {
      if (error) {
        console.error("Error permanently deleting department:", error);
        return res.status(500).json({ error: "Database Error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Department not found" });
      }
      return res
        .status(200)
        .json({ message: "Department permanently deleted successfully" });
    });
  } catch (error) {
    console.error("Error permanently deleting department:", error);
    return res
      .status(500)
      .json({ error: "Failed to permanently delete department" });
  }
};
exports.getDepartmentById = (req, res) => {
  const depId  = req.params.id;
  if (!depId || isNaN(depId)) {
    return res.status(400).json({ error: "Invalid department ID" });
  }
  const sql = "SELECT *FROM departments WHERE id=?";
  db.query(sql, [depId], (error, results) => {
    if (error) {
      console.error("Error fetching department:", error);
      return res.status(500).json({ error: "Database Error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Department not found" });
    }
    return res.status(200).json(results[0]);
  });
};
exports.softlyDeletedDepartments = (req, res) => {
  db.query("SELECT * FROM departments WHERE deleted=1", (err, results) => {
    if (err) 
   { return res.status(500).json({ error: "Database error" });}
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No soft-deleted departments found" });

     
    }
     return res.status(200).json(results);
  });
};
