// config/db.js
import mongoose from "mongoose"
import { env } from "./env.js"

export const connectDB = async () => {
  try{
    await mongoose.connect(env.MONGODB_URI , {
      serverSelectionTimeoutMS: 5000, // don't hang forever
      socketTimeoutMS: 45000,
      maxPoolSize: 10
    })
  }
  catch(err){
    console.log(err);
  }
}
  
let isDbConnected = false;

mongoose.connection.on("connected", () => {
  isDbConnected = true;
  console.log("✅ MongoDB connected");
});

mongoose.connection.on("disconnected", () => {
  isDbConnected = false;
  console.error("❌ MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  isDbConnected = false;
  console.error("🚨 MongoDB error:", err.message);
});

export const getDbStatus = () => isDbConnected;

