const express = require('express');
const {
  createWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
} = require('../controller/workoutController');
const router = express.Router();
const { authenticate, IsUser } = require("../middleware/authenticate ")

/**
 * @swagger
 * /workouts/add:
 *   post:
 *     summary: Add a new workout
 *     tags: [Workouts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       201:
 *         description: Workout created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/add', authenticate, IsUser, createWorkout);

/**
 * @swagger
 * /workouts:
 *   get:
 *     summary: Get all workouts for the authenticated user
 *     tags: [Workouts]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of workouts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Workout'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, IsUser, getWorkouts);

/**
 * @swagger
 * /workouts/{id}:
 *   put:
 *     summary: Update a workout by ID
 *     tags: [Workouts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the workout to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       200:
 *         description: Workout updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Workout not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authenticate, IsUser, updateWorkout);

/**
 * @swagger
 * /workouts/{id}:
 *   delete:
 *     summary: Delete a workout by ID
 *     tags: [Workouts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the workout to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workout deleted successfully
 *       404:
 *         description: Workout not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authenticate, IsUser, deleteWorkout);

module.exports = router;
