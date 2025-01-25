import mongoose, { Schema, Document, Model } from "mongoose";

// Define the TypeScript interface for a User
export interface UserSchemaType extends Document {
  name: string;
  email: string;
  DOB: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema
const UserSchema: Schema = new Schema<UserSchemaType>(
  {
    name: {
      type: String,
      required: true,
      minlength: [4, "name should be at least 4 letter"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
      minlength: [5, "email should be at least 5 letter"],
    },
    DOB: { type: Date },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

// Create the User model
export const User: Model<UserSchemaType> = mongoose.model<UserSchemaType>("User", UserSchema);
