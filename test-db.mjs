import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function testConnection() {
    try {
        console.log('MONGODB_URI:', MONGODB_URI ? 'Set' : 'Not set');
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(MONGODB_URI, { bufferCommands: false });
        console.log('✅ Successfully connected to MongoDB!');
        await mongoose.connection.close();
        console.log('Connection closed.');
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        console.error('Full error:', error);
    }
}

testConnection();