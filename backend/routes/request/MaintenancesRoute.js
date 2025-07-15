const express = require("express");
const router = express.Router();
const  maintenanceRequestController  = require("../../controller/requests/MaintenanceController");

const { authenticateToken } = require("../../middleware/loginMiddleware");
router.post("/", authenticateToken,maintenanceRequestController.maintenanceRequest);
router.get("/",maintenanceRequestController.getAllMaintenanceRequests);
router.put("/:id",authenticateToken,maintenanceRequestController.editRequest);
router.get("/yours", authenticateToken,maintenanceRequestController.getYoursRequests);
router.put("/approve/:id",authenticateToken,maintenanceRequestController.approveMaintenanceRequest)
router.delete("/:id", authenticateToken,maintenanceRequestController.deleteMaintenanceRequest);
module.exports = router;