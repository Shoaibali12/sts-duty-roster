const express = require("express");
const router = express.Router();
const controller = require("../controllers/dutyAssignment.controller");

// Save or update the single record
router.post("/save-or-update", controller.saveOrUpdateSingleton);

// Get duty assignment (with default fallback)
router.get("/get-duty-assignments", controller.getAllDutyAssignments);

module.exports = router;
