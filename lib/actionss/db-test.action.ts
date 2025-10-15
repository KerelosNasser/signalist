'use server'

import { testConnection } from '@/database/mongose';

export async function testDbConnection() {
  try {
    const result = await testConnection();
    return {
      success: true,
      connected: result,
      message: result 
        ? 'Successfully connected to MongoDB' 
        : 'Failed to connect to MongoDB'
    };
  } catch (error) {
    return {
      success: false,
      connected: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}