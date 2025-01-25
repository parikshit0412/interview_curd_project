import mongoose from "mongoose";

export async function connectToDB() {
  try {
    console.log("Connecting to database...");
    await mongoose.connect("mongodb://localhost:27017/interviewCurd");
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}