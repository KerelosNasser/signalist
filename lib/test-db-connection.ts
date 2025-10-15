import { connectToDB } from '@/database/mongose';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testDbConnection() {
  console.log('Testing database connection...');
  
  try {
    console.log('Connecting to database...');
    const conn = await connectToDB();
    console.log('✅ Database connected successfully!');
    console.log('Connection state:', conn.connection.readyState);
    console.log('Host:', conn.connection.host);
    console.log('Database name:', conn.connection.name);
    
    // Close the connection
    await conn.connection.close();
    console.log('Connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(error);
    process.exit(1);
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testDbConnection();
}

export default testDbConnection;