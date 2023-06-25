import express from 'express';
import { registerUser } from '../controllers/userController';


const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided name, number, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               number:
 *                 type: number
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - number
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object 
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Email is already registered
 *       500:
 *         description: Server Error
 */
router.route("/register").post(registerUser)

export default router;