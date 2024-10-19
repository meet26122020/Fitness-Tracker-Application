const { default: mongoose } = require("mongoose");

const ProgramSchema = new mongoose.Schema({

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    activities: [
      {
        activityType: {
          type: String,
          enum: ['Running', 'Cycling', 'Swimming', 'Weightlifting', 'Yoga', 'Other'],
          required: true,
        },
        duration: {
          type: Number, // duration in minutes
          required: true,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Program', ProgramSchema);