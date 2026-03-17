import 'dotenv/config';
import mongoose from 'mongoose';
import dns from 'dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('ERROR: MONGODB_URI must be set in .env');
    process.exit(1);
  }

  try {
    console.log(`CONNECTING: Attempting to connect to MongoDB... (Target: ${uri.split('@').pop()?.split('/')[0]})`);
    const startedAt = Date.now();
    const opts = { 
      bufferCommands: false, 
      serverSelectionTimeoutMS: 15000,
      family: 4 
    };
    await mongoose.connect(uri, opts);
    const elapsed = Date.now() - startedAt;

    const dbName = mongoose.connection?.name || '(unknown)';
    const host = mongoose.connection?.host || '(unknown)';

    console.log(`SUCCESS: Connected to MongoDB [db="${dbName}", host="${host}", time=${elapsed}ms]`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('FAILED: Database connection failed');
    console.error(err);
    try { await mongoose.connection.close(); } catch {}
    process.exit(1);
  }
}

main();
