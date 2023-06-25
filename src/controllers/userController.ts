import express, { Request, Response } from 'express';
import { Schema, model, Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 
import User from "../models/User";

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
export const registerUser=async (req: Request, res: Response) => {
    try {
      const { name, number, email, password } = req.body;
  
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({ name, number, email, password: hashedPassword });
      await newUser.save();
  
      // Generate JWT token
      const token = jwt.sign({ userId: newUser._id }, 'yourSecretKey');
  
      // Return the token to the client
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }