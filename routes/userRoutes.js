const express = require("express");
const { signup, login, logout } = require("../controller/userController");
const router = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input or user already exists
 */
router.post("/signup", signup);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Log out the current user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: User not authenticated
 */



router.post("/logout", logout);

module.exports = router;
