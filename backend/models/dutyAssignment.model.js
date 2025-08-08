const mongoose = require("mongoose");

const instructionSchema = new mongoose.Schema({
  role: { type: String, required: true },
  content: { type: String, required: true },
});

const dutyAssignmentSchema = new mongoose.Schema({
  testTitle: { type: String, required: true },
  testDate: { type: Date, required: true },
  totalApplicants: { type: Number, required: true },
  instructions: [instructionSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DutyAssignment", dutyAssignmentSchema);
