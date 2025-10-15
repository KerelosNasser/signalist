import * as mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
  var mongooseCache: {
    conn: typeof mongoose | null,
    promise: Promise<typeof mongoose> | null
  }
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = {conn: null, promise: null}
}

export const connectToDB = async () => {
  if (!MONGODB_URI) throw new Error("Please add your Mongo URI to .env");

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {bufferCommands: false})
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    console.error("MongoDB connection error:", e);
    throw e;
  }
}

// Test function to verify connection
export const testConnection = async () => {
  try {
    const conn = await connectToDB();
    console.log("MongoDB connected successfully!");
    console.log("Connection state:", conn.connection.readyState);
    return true;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    return false;
  }
}