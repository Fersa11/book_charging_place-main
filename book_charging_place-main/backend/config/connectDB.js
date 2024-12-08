import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongoDBURL = process.env._mongoDBURL;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoDBURL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error:${error.mesage}`);
    process.exit(1); //code 1 means exit process
  }
};
