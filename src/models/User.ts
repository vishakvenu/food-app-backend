import mongoose, { Document, Schema } from "mongoose";

export interface UserData extends Document {
  name: string;
  email: string;
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    validate: {
      validator: (value: string) => {
        return typeof value === 'string';
      },
      message: 'Name must be a string',
    },
  },
  number: {
    type: Number,
    required: [true, 'Number is required'],
    validate: {
      validator: (value: number) => {
        return Number.isInteger(value);
      },
      message: 'Number must be an integer',
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (value: string) => {
        // You can use a regular expression or a library like 'validator' to validate the email format
        // Here's an example using a basic regular expression for simplicity
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(value);
      },
      message: 'Email must be a valid email address',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
});

export default mongoose.model<UserData>('User', userSchema);
