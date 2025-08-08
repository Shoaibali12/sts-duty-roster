const DutyAssignment = require("../models/dutyAssignment.model");

// Embedded default instructions
const defaultInstructions = [
  {
    role: "General Instructions",
    content: "All staff must report 30 mins before exam.",
  },
  {
    role: "Transportation",
    content: "Ensure buses are available 1 hour before.",
  },
  {
    role: "Coordination (Pre Team)",
    content: "Check attendance and arrangement.",
  },
  {
    role: "Coordination (Post Team)",
    content: "Collect feedback and submit report.",
  },
  { role: "IT", content: "Set up all computers and network." },
  {
    role: "Janitorial Staff",
    content: "Clean all exam halls before and after.",
  },
  {
    role: "Engineering Staff",
    content: "Ensure fans, lights and generators are working.",
  },
  { role: "Procurement", content: "Provide stationery and ID cards." },
  {
    role: "Security",
    content: "Verify candidate identity and guard entrances.",
  },
  {
    role: "Control Room Staff",
    content: "Monitor surveillance and respond to issues.",
  },
];

// Save or update the single record
exports.saveOrUpdateSingleton = async (req, res) => {
  try {
    const { testTitle, testDate, totalApplicants, instructions } = req.body;

    let duty = await DutyAssignment.findOne();

    if (duty) {
      duty.testTitle = testTitle;
      duty.testDate = testDate;
      duty.totalApplicants = totalApplicants;
      duty.instructions = instructions;
      await duty.save();
    } else {
      duty = await DutyAssignment.create({
        testTitle,
        testDate,
        totalApplicants,
        instructions,
      });
    }

    res.status(200).json(duty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper: merge defaults with actual instructions
function mergeWithDefaultInstructions(saved = []) {
  const map = {};

  // Save edited ones first
  saved.forEach((inst) => {
    map[inst.role] = inst.content;
  });

  // Merge with defaults
  return defaultInstructions.map((def) => ({
    role: def.role,
    content: map[def.role] || def.content,
  }));
}

// ✅ GET duty assignment
exports.getAllDutyAssignments = async (req, res) => {
  try {
    let duty = await DutyAssignment.findOne();

    if (!duty) {
      return res.status(200).json([
        {
          testTitle: "",
          testDate: null,
          totalApplicants: 0,
          instructions: defaultInstructions,
        },
      ]);
    }

    // Merge instructions with defaults
    const fullInstructions = mergeWithDefaultInstructions(duty.instructions);

    res.status(200).json([
      {
        ...duty.toObject(),
        instructions: fullInstructions,
      },
    ]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
