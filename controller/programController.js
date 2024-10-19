const Program = require('../models/programModel');
const User = require("../models/userModel");
const WorkOut = require('../models/workoutModel'); // Adjust the path as necessary
const Goal = require('../models/goalModel'); // Ensure Goal is also imported


// Create a new fitness program

exports.createProgram = async (req, res) => {
    try {
        const { title, description, activities } = req.body;

        // Ensure that the createdBy field is set to the logged-in user's ID
        const program = new Program({
            title,
            description,
            activities,
            createdBy: req.user.id, // Assuming req.user is set by your authentication middleware
        });

        await program.save();

        res.status(201).json({
            success: true,
            message: 'Program created successfully',
            program,
        });
    } catch (error) {
        console.error('Error creating program:', error.message);
        res.status(400).json({
            success: false,
            message: 'Error creating program',
            error: error.message,
        });
    }
};


// Get all programs
exports.getPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific program by ID
exports.getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Program not found.' });
    }
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all users

exports.GetAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
  
  // Admin: Delete a user
  
  exports.DeleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).send('User not found');
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Get workout statistics

  exports.GetAggrigate = async (req, res) => {
    const { startDate, endDate, activityType, goalStatus } = req.query;
    try {
  
      const workoutMatch = { user: req.user.id };
      if (startDate && endDate) {
        workoutMatch.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
      }
      if (activityType) {
        workoutMatch.activityType = activityType;
      }
  
      // Filter criteria for Goal
      const goalMatch = { user: req.user.id };
      if (goalStatus) {
        goalMatch.status = goalStatus;
      }
  
      // Aggregate workout statistics
      const workoutStats = await WorkOut.aggregate([
        { $match: workoutMatch },
        {
          $group: {
            _id: '$activityType',
            totalDuration: { $sum: '$duration' },
            totalCalories: { $sum: '$caloriesBurned' },
            averageCalories: { $avg: '$caloriesBurned' },
            count: { $sum: 1 },
          },
        },
      ]);
      console.log('Workout Stats filtered by date range:', workoutStats);
      
  
      // Aggregate goal statistics
      const goalStats = await Goal.aggregate([
        {
          $group: {
            _id: '$status',
            totalGoals: { $sum: 1 },
            achievedGoals: { $sum: { $cond: [{ $eq: ['$status', 'Achieved'] }, 1, 0] } },
            onTrackGoals: { $sum: { $cond: [{ $eq: ['$status', 'On Track'] }, 1, 0] } },
            behindGoals: { $sum: { $cond: [{ $eq: ['$status', 'Behind'] }, 1, 0] } },
          },
        },
      ]);
      
      console.log('Goal Stats without filters:', goalStats);
      
      res.json({ workoutStats, goalStats });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }