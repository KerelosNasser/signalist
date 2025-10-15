require('dotenv').config();
const mongoose = require('mongoose');

async function testDbConnection() {
  console.log('Testing database connection...');
  
  // Get the URI from environment variables
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in environment variables');
    console.log('Please add MONGODB_URI to your .env.local file');
    process.exit(1);
  }
  
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });
    console.log('✅ Database connected successfully!');
    console.log('Connection state:', mongoose.connection.readyState);
    console.log('Host:', mongoose.connection.host);
    console.log('Database name:', mongoose.connection.name);
    
    // Close the connection
    await mongoose.connection.close();
    console.log('Connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(error);
    process.exit(1);
  }
}

// Run the test
testDbConnection();