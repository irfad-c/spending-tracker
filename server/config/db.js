//This is database connection file

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    //onn.connection.host = the MongoDB server your backend is currently connected to.
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // stop server on DB failure
    process.exit(1);
  }
};

export default connectDB;
