const Goal = require('../models/goalModel');

// Create Goal
exports.createGoal = async (req, res) => {
    try {
        const goal = new Goal({
          userId: req.user._id,
          type: req.body.type,
          targetDuration: req.body.targetDuration,
          targetCalories: req.body.targetCalories,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
        });
        await goal.save();
        res.status(201).json(goal);
      } catch (error) {
        res.status(400).json({ error: 'Failed to create goal' });
      }
};

// Get Goals
exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ userId: req.user._id });
        res.json(goals);
      } catch (error) {
        res.status(400).json({ error: 'Failed to fetch goals' });
      }
};

// Update Goal
exports.updateGoal = async (req, res) => {
    try {
        const goal = await Goal.findOneAndUpdate(
          { _id: req.params.id, userId: req.user._id },
          req.body,
          { new: true }
        );
        if (!goal) {
          return res.status(404).json({ error: 'Goal not found' });
        }
        res.json(goal);
      } catch (error) {
        res.status(400).json({ error: 'Failed to update goal' });
      }
};

// Delete Goal
exports.deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!goal) {
          return res.status(404).json({ error: 'Goal not found' });
        }
        res.json({ message: 'Goal deleted successfully' });
      } catch (error) {
        res.status(400).json({ error: 'Failed to delete goal' });
    }
};
