import mongoose from "mongoose";

// const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`);
  }
};

export default connectDB;
