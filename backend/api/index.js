import serverless from "serverless-http";
import connectDB from "../db/index.js";
import { app } from "../app.js";
import mongoose from "mongoose";

// In Vercel, environment variables are automatically available
// No need to load .env file

console.log("Serverless handler initializing...");
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "SET" : "NOT SET");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("VERCEL:", process.env.VERCEL);

// Track connection promise to avoid multiple simultaneous connections
let connectionPromise = null;

// Connect to MongoDB if not already connected
const ensureDatabaseConnection = async () => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      return;
    }
    
    // If connection is in progress, wait for it
    if (connectionPromise) {
      await connectionPromise;
      return;
    }
    
    // Start new connection
    console.log("Attempting to connect to MongoDB...");
    connectionPromise = connectDB();
    await connectionPromise;
    connectionPromise = null;
    console.log("MongoDB connection successful");
  } catch (error) {
    connectionPromise = null;
    console.error("Database connection error:", error.message);
    console.error("Error stack:", error.stack);
    // Don't throw - let the request continue, routes can handle DB errors
  }
};

// Create serverless handler
const serverlessHandler = serverless(app, {
  binary: ['image/*', 'application/pdf']
});

// Wrap handler to ensure DB connection
const handler = async (event, context) => {
  try {
    // Ensure database connection before handling request
    await ensureDatabaseConnection();
    
    // Call the serverless handler
    return await serverlessHandler(event, context);
  } catch (error) {
    console.error("Handler error:", error);
    console.error("Error stack:", error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
};

console.log("Serverless handler initialized");

// Export the serverless handler (default export for Vercel)
export default handler;

