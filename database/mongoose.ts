import mongoose from "mongoose";
import dns from "dns";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  console.warn("Failed to set custom DNS servers, SRV resolution might fail:", e);
}

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  // Force DNS servers again right before connection to ensure they are active in the current context
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
    console.log("DNS servers set to 8.8.8.8, 1.1.1.1");
  } catch (e) {
    console.warn("Failed to set DNS servers:", e);
  }

  if (!MONGODB_URI) {
    console.error("CRITICAL: MONGODB_URI is not defined in environment variables.");
    throw new Error("MONGODB_URI must be set within .env");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Attempting to connect to MongoDB...");
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 15000, // Increased timeout
      family: 4, 
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      console.log(`Successfully connected to MongoDB: ${m.connection.name}`);
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err: any) {
    cached.promise = null;
    console.error("MongoDB connection error:", err);
    if (err.message && err.message.includes("ECONNREFUSED")) {
      console.error(
        "HINT: This error often occurs when DNS SRV limits block the connection. " +
        "Try using the 'Standard Connection String' (without +srv) from MongoDB Atlas if this persists."
      );
    }
    throw err;
  }

  return cached.conn;
};
