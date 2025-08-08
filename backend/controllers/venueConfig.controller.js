const VenueConfig = require("../models/venueConfig.model");

const cleanVenueConfig = (config) => {
  const obj = config.toObject();

  if (obj.sections) {
    obj.sections = obj.sections.map((section) => {
      const { _id, rooms, ...restSection } = section;
      const cleanRooms = rooms.map(({ _id, ...restRoom }) => restRoom);
      return { ...restSection, rooms: cleanRooms };
    });
  }

  if (obj.supportRoles) {
    obj.supportRoles = obj.supportRoles.map(({ _id, ...restRole }) => restRole);
  }

  const { _id, __v, ...cleaned } = obj;
  return cleaned;
};

// Then in getVenueConfigsByEventId
exports.getVenueConfigsByEventId = async (req, res) => {
  try {
    const { eventId } = req.params;
    const configs = await VenueConfig.find({ eventId });

    // Clean each config before sending response
    const cleanedConfigs = configs.map(cleanVenueConfig);

    res.status(200).json(cleanedConfigs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➕ Create/Add a new venue config
exports.createVenueConfig = async (req, res) => {
  try {
    const newConfig = await VenueConfig.create(req.body);
    res.status(201).json(newConfig);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🛠️ Update venue config by _id
exports.updateVenueConfig = async (req, res) => {
  try {
    const { _id } = req.body;

    const updated = await VenueConfig.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Venue config not found." });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📥 Get all venue configs by eventId
exports.getVenueConfigsByEventId = async (req, res) => {
  try {
    const { eventId } = req.params;

    const configs = await VenueConfig.find({ eventId });
    res.status(200).json(configs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
