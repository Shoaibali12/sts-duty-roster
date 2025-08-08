const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const venueConfigRoutes = require("./routes/venueConfig.routes");

// ✅ Only one route: Duty Assignment
const dutyRoutes = require("./routes/dutyAssignment.routes");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Main API route
app.use("/api/duty-assignment", dutyRoutes);
app.use("/api/venue-config", venueConfigRoutes);
// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
