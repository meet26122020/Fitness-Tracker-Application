const mongoose = require("mongoose");

// Define Workout Schema
const WorkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    activityType: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    caloriesBurned: {
      type: Number,
      required: true,
    },
    startDate: { 
      type: Date, 
      required: true 
  }, 
  endDate: { 
      type: Date, 
      required: true 
  }, 

  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", WorkoutSchema);
