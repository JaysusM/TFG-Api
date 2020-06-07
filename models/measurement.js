const mongoose = require("mongoose");

const MeasurementSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      required: true,
    },
    position: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
  },
  { collection: "measurement" }
);

module.exports = mongoose.model("Measurement", MeasurementSchema);
