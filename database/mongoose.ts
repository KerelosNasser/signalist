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
  if (!MONGODB_URI) {
    console.error(
      "CRITICAL: MONGODB_URI is not defined in environment variables.",
    );
    throw new Error("MONGODB_URI must be set within .env");
  }

  if (cached.conn) {
    console.log("Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Attempting to connect to MongoDB...");
    // If the error is querySrv ECONNREFUSED, it's often a DNS issue.
    // We can add a timeout or check the URI format.
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // 10s timeout
      family: 4, // Force IPv4 to avoid some DNS issues
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
        "HINT: This error often occurs when DNS SRV limits or network firewalls block the connection to MongoDB Atlas.",
      );
    }
    throw err;
  }

  return cached.conn;
};
