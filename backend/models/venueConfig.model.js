const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNo: Number,
  capacity: { type: Number, default: 30 },
});

const sectionSchema = new mongoose.Schema({
  sectionNo: Number,
  rooms: [roomSchema],
});

const supportRoleSchema = new mongoose.Schema({
  role: { type: String, required: true },
  count: { type: Number, required: true },
});

const venueConfigSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, required: true },
  venueType: { type: String, enum: ["campus", "external"], required: true },
  venueName: { type: String, required: true },
  block: { type: String },
  sections: [sectionSchema],
  supportRoles: [supportRoleSchema],
});

module.exports = mongoose.model("VenueConfig", venueConfigSchema);
