const express = require("express");
const router = express.Router();
const controller = require("../controllers/venueConfig.controller");

// ➕ Add new venue config
router.post("/add", controller.createVenueConfig);

// 🛠️ Update existing config (by _id)
router.put("/update", controller.updateVenueConfig);

// 📥 Get all configs for event
router.get("/:eventId", controller.getVenueConfigsByEventId);

module.exports = router;
