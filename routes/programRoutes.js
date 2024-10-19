const express = require("express");
const router = express.Router();
const {
  createProgram,
  getPrograms,
  getProgramById,
  GetAllUser,
  DeleteUser,
  GetAggrigate,
} = require("../controller/programController");
const { IsAdmin, authenticate } = require("../middleware/authenticate ");

/**
 * @swagger
 * /programs/add:
 *   post:
 *     summary: Add a new program
 *     tags: [Programs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Program'
 *     responses:
 *       201:
 *         description: The program was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       400:
 *         description: Bad request
 */

router.post("/add", authenticate, IsAdmin, createProgram);

/**
 * @swagger
 * /programs:
 *   get:
 *     summary: Get all programs
 *     tags: [Programs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all programs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Program'
 */

router.get("/", authenticate, IsAdmin, getPrograms);

/**
 * @swagger
 * /programs/{id}:
 *   get:
 *     summary: Get a program by ID
 *     tags: [Programs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The program ID
 *     responses:
 *       200:
 *         description: Program data for the provided ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       404:
 *         description: Program not found
 */

router.get("/:id", authenticate, IsAdmin, getProgramById);

/**
 * @swagger
 * /programs/user:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get("/user", authenticate, IsAdmin, GetAllUser);

/**
 * @swagger
 * /programs/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       404:
 *         description: User not found
 */

router.delete("/users/:id", authenticate, IsAdmin, DeleteUser);

/**
 * @swagger
 * /programs/workout-stats:
 *   get:
 *     summary: Get workout statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Start date for the statistics
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: End date for the statistics
 *       - in: query
 *         name: activityType
 *         schema:
 *           type: string
 *         description: The activity type for filtering statistics
 *     responses:
 *       200:
 *         description: Workout statistics for the provided filters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 workoutStats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       activityType:
 *                         type: string
 *                       totalDuration:
 *                         type: number
 *                       totalCalories:
 *                         type: number
 *                       averageCalories:
 *                         type: number
 *                       count:
 *                         type: number
 */

router.get("/workout-stats", authenticate, IsAdmin, GetAggrigate);

module.exports = router;
