import express, { Request, Response } from 'express';
import { Schema, model, Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 
import User from "../models/User";
import { handleValidationErrors, sendResponse } from '../utils/utils';

// Example usage in your registerUser function
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, number, email, password } = req.body;

    // Check if any required field is missing
    if (!name || !number || !email || !password) {
      return sendResponse(res, false, 'Please provide all required fields');
    }
    if (typeof name !== 'string') {
      return sendResponse(res, false, 'Name must be a string');
    }

    // Check if the number is not an integer
    if (!Number.isInteger(number)) {
      return sendResponse(res, false, 'Number must be an integer');
    }


    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(res, false, 'Email is already registered');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, number, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, 'yourSecretKey');

    // Return the success response to the client
    sendResponse(res, true, 'Registration successful', { token });

  } catch (error:any) {
    if (error.name === 'ValidationError') {
      handleValidationErrors(res, error);
    } else {
      sendResponse(res, false, 'Server Error', null, { error: [error.message] });
    }
  }
};
