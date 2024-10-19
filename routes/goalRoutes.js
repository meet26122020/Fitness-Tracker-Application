const express = require("express");
const router = express.Router();
const { createGoal, getGoals, updateGoal, deleteGoal } = require("../controller/goalController");
const { authenticate, IsUser } = require("../middleware/authenticate ");

/**
 * @swagger
 * /goals/add:
 *   post:
 *     summary: Add a new goal
 *     tags: [Goals]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Goal'
 *     responses:
 *       201:
 *         description: Goal created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/add", authenticate, IsUser, createGoal);

/**
 * @swagger
 * /goals:
 *   get:
 *     summary: Get all goals for the authenticated user
 *     tags: [Goals]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of goals for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Goal'
 *       500:
 *         description: Server error
 */
router.get("/", authenticate, IsUser, getGoals);

/**
 * @swagger
 * /goals/{id}:
 *   put:
 *     summary: Update an existing goal
 *     tags: [Goals]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The goal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Goal'
 *     responses:
 *       200:
 *         description: Goal updated successfully
 *       404:
 *         description: Goal not found
 *       400:
 *         description: Invalid input
 */
router.put("/:id", authenticate, IsUser, updateGoal);

/**
 * @swagger
 * /goals/{id}:
 *   delete:
 *     summary: Delete a goal by ID
 *     tags: [Goals]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The goal ID
 *     responses:
 *       200:
 *         description: Goal deleted successfully
 *       404:
 *         description: Goal not found
 */
router.delete("/:id", authenticate, IsUser, deleteGoal);

module.exports = router;
