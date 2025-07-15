const db = require("../../db/config");

exports.maintenanceRequest = (req, res) => {
  try {
    const { item_name, priority, description, category_issue } = req.body;
    if (!item_name || !priority || !description || !category_issue) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const userId = req.user.id;
    const newRequest = {
      item_name,
      priority,
      description,
      category_issue,
      requested_by: userId,
      status: "pending",
    };
    const sql = `INSERT INTO maintenances (item_name,priority,description,category_issue,requested_by,status) VALUES (?,?,?,?,?,?)`;
    const values = [
      newRequest.item_name,
      newRequest.priority,
      newRequest.description,
      newRequest.category_issue,
      newRequest.requested_by,
      newRequest.status,
    ];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error inserting maintenance request:", err);
        return res
          .status(500)
          .json({ error: "Failed to create maintenance request" });
      }
      return res.status(201).json({
        message: "Maintenance request created successfully",
        request: newRequest,
      });
    });
  } catch (error) {
    return res.status(400).json({ error: "fialed to request" });
  }
};

exports.getAllMaintenanceRequests = (req, res) => {
  const sql = `SELECT * FROM maintenances`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching maintenance requests:", err);
      return res.status(500).json({ error: "Failed to fetch requests" });
    }
    return res.status(200).json(results);
  });
};

exports.deleteMaintenanceRequest = (req, res) => {
  const requestId = req.params.id;
  const userId = req.user?.id;

  const sqlCheck = `SELECT * FROM maintenances WHERE id = ? AND requested_by = ?`;
  db.query(sqlCheck, [requestId, userId], (err, results) => {
    if (err) {
      console.error("Error checking maintenance request:", err);
      return res.status(500).json({ error: "Failed to check request" });
    }
    if (results.length === 0) {
      return res.status(404).json({
        error:
          "Request not found or you are not authorized to delete this request",
      });
    }
    if( results[0].status !== "pending") {
      return res.status(400).json({ error: " Sorry!, Only pending requests can be deleted" });
    }
    const status = "pending";
    const sql = `DELETE FROM maintenances WHERE id = ?`;
    db.query(sql, [requestId], (err, result) => {
      if (err) {
        console.error("Error deleting maintenance request:", err);
        return res
          .status(500)
          .json({ error: "Failed to delete request sure it is pending" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Request not found" });
      }
      return res.status(200).json({ message: "Request deleted successfully" });
    });
  });
};
// ✅ Only use params and token
exports.approveMaintenanceRequest = (req, res) => {
  const requestId = req.params.id;
  const userId = req.user?.id;
  const userRole = req.user?.role;

  console.log("User ID:", userId);
  console.log("Request ID:", requestId);
  console.log("User Role:", userRole);

  if (!userId) {
    return res.status(403).json({ error: "Unauthorized to approve requests" });
  }

  if (!requestId) {
    return res.status(400).json({ error: "Request ID is required" });
  }

  if (userRole !== "admin") {
    return res
      .status(403)
      .json({ error: "Only admin or manager can approve requests" });
  }

  // Step 1: Check if request is pending
  const sqlCheck = `SELECT * FROM maintenances WHERE id = ? AND status = 'pending'`;
  db.query(sqlCheck, [requestId], (err, results) => {
    if (err) {
      console.error("SQL Error:", err.message);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "Request not found or already approved" });
    }

    // Step 2: Check if the user is trying to approve their own request
    const requestedById = results[0].requested_by;
    if (requestedById === userId) {
      return res
        .status(403)
        .json({ error: "You cannot approve your own request" });
    }

    // Step 3: Approve the request
    const sql = `UPDATE maintenances SET status = ?, approved_by = ? WHERE id = ?`;
    db.query(sql, ["approved", userId, requestId], (err, result) => {
      if (err) {
        console.error("SQL Error:", err.message);
        return res.status(500).json({ error: "Database error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Request not found" });
      }

      return res.status(201).json({ message: "Request approved successfully" });
    });
  });
};

exports.getMaintenanceRequestById = (req, res) => {
  const requestId = req.params.id;
  const sql = `SELECT * FROM maintenances WHERE id = ?`;
  db.query(sql, [requestId], (err, results) => {
    if (err) {
      console.error("Error fetching maintenance request:", err);
      return res.status(500).json({ error: "Failed to fetch request" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Request not found" });
    }
    return res.status(200).json(results[0]);
  });
};
exports.getUserMaintenanceRequests = (req, res) => {
  const userId = req.user.id;
  const sql = `SELECT * FROM maintenances WHERE requested_by = ?`;
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user maintenance requests:", err);
      return res.status(500).json({ error: "Failed to fetch requests" });
    }
    return res.status(200).json(results);
  });
};

exports.getPendingMaintenanceRequests = (req, res) => {
  const sql = `SELECT * FROM maintenances WHERE status = 'pending'`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching pending maintenance requests:", err);
      return res.status(500).json({ error: "Failed to fetch requests" });
    }
    return res.status(200).json(results);
  });
};
exports.getCompletedMaintenanceRequests = (req, res) => {
  const sql = `SELECT * FROM maintenances WHERE status = 'completed'`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching completed maintenance requests:", err);
      return res.status(500).json({ error: "Failed to fetch requests" });
    }
    return res.status(200).json(results);
  });
};
exports.editRequest = (req, res) => {
  const requestId = req.params.id;
  const userId = req.user.id;
  const sql = `SELECT * FROM maintenances WHERE id = ? AND requested_by = ?`;
  db.query(sql, [requestId, userId], (err, results) => {
    if (err) {
      console.error("Error fetching maintenance request for edit:", err);
      return res.status(500).json({ error: "Failed to fetch request" });
    }
    if (results.length === 0) {
      return res.status(404).json({
        error:
          "Request not found or you are not authorized to edit this request",
      });
    }
    if( results[0].status !== "pending") {
      return res.status(400).json({ error: "Only pending requests can be edited" });
    }
    // If the request exists and belongs to the user, proceed with the update
    const { item_name, priority, description, category_issue } = req.body;
    if (!item_name || !priority || !description || !category_issue) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const sql = `UPDATE maintenances SET item_name = ?, priority = ?, description = ?, category_issue = ? WHERE id = ?`;
    const values = [
      item_name,
      priority,
      description,
      category_issue,
      requestId,
    ];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error updating maintenance request:", err);
        return res.status(500).json({ error: "Failed to update request" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Request not found" });
      }
      return res.status(200).json({ message: "Request updated successfully" });
    });
  });
};

exports.getYoursRequests = (req, res) => {
  const sql = `SELECT maintenances.*,requester.first_name AS firstName,approver.first_name AS approvedBy,department.name AS userDepartment FROM maintenances JOIN users AS requester ON maintenances.requested_by=requester.id LEFT JOIN users AS approver ON maintenances.approved_by=approver.id LEFT JOIN departments AS department ON requester.department_id=department.id  WHERE maintenances.requested_by=?`;
  const userId = req.user.id;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user requests:", err);
      return res.status(500).json({ error: "Failed to fetch requests" });
    }
    // console.log("User Requests:", results);
    return res.status(200).json(results);
  });
};
exports.rejectMaintenanceRequest = (req, res) => {
  const requestId = req.params.id;
  const userId = req.user.id;

  if (!requestId) {
    return res.status(400).json({ error: "Request ID is required" });
  }
  const status = "pending";
  const sqlCheck = `SELECT * FROM maintenances WHERE id = ? AND status = ?`;
  db.query(sqlCheck, [requestId, status], (err, results) => {
    if (err) {
      console.error("Error checking maintenance request:", err);
      return res.status(500).json({ error: "Failed to check request" });
    }
    if (results.length === 0) {
      return res.status(404).json({
        error:
          "Request not found or you are not authorized to reject this request",
      });
    }
    if (results[0].requested_by === userId) {
      return res
        .status(403)
        .json({ error: "You cannot reject your own request" });
    }
    if (results[0].status !== "pending") {
      return res
        .status(400)
        .json({ error: "Only pending requests can be rejected" });
    }
    if (req.user.role !== "admin" || req.user.role !== "director") {
      return res
        .status(403)
        .json({ error: "Only admin or Director can reject requests" });
    }

    const sql = `UPDATE maintenances SET status = 'rejected' WHERE id = ?`;
    db.query(sql, [requestId], (err, result) => {
      if (err) {
        console.error("Error rejecting maintenance request:", err);
        return res.status(500).json({ error: "Failed to reject request" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Request not found" });
      }
      return res.status(200).json({ message: "Request rejected successfully" });
    });
  });
};
