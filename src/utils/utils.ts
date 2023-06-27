import { Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  error: null | Record<string, string[]>; // Update the error type to an object with field names as keys
}

export const sendResponse = <T>(
  res: Response,
  success: boolean,
  message: string,
  data: T | null = null,
  error: null | Record<string, string[]> = null // Update the error type to an object with field names as keys
): void => {
  const response: ApiResponse<T> = {
    success,
    message,
    data,
    error,
  };
  res.status(success ? 200 : 400).json(response);
};

// Function to handle validation errors
export const handleValidationErrors = (res: Response, error: MongooseError.ValidationError): void => {
  const validationErrors: Record<string, string[]> = {}; // Use an object with field names as keys

  for (const field in error.errors) {
    if (error.errors.hasOwnProperty(field)) {
      const errorMessage = error.errors[field].message;

      // Check if the field is already present in the validationErrors object
      if (validationErrors[field]) {
        validationErrors[field].push(errorMessage);
      } else {
        validationErrors[field] = [errorMessage];
      }
    }
  }

  sendResponse(res, false, 'Validation Error', null, validationErrors);
};

// Function to handle general errors
export const handleErrors = (res: Response, error: Error): void => {
  console.error(error);
  sendResponse(res, false, 'Server Error', null, { error: [error.message] });
};
