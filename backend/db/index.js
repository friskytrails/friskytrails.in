import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Cache the connection promise to avoid multiple connections
let cachedConnection = null;

const connectDB = async () => {
  try {
    // Check if already connected (important for serverless environments)
    if (mongoose.connection.readyState === 1) {
      console.log("✅ MongoDB already connected");
      return mongoose.connection;
    }

    // If connection is in progress, wait for it
    if (cachedConnection) {
      console.log("⏳ Waiting for existing connection...");
      return await cachedConnection;
    }

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    // Create connection promise and cache it
    const mongoUri = `${process.env.MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority`;
    console.log("🔌 Connecting to MongoDB...");
    
    cachedConnection = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });

    const connectionInstance = await cachedConnection;
    console.log(`✅ MongoDB connected: ${connectionInstance.connection.host}`);
    
    // Clear cache on connection close
    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB disconnected");
      cachedConnection = null;
    });

    return connectionInstance;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    cachedConnection = null; // Clear cache on error
    
    // Don't exit process in serverless environments
    if (process.env.VERCEL !== "1" && process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
    throw error;
  }
};

export default connectDB;
