'use client';

import { useState, useEffect } from 'react';
import { testDbConnection } from '@/lib/actionss/db-test.action';

export default function TestDbPage() {
  const [connectionStatus, setConnectionStatus] = useState<{
    success: boolean;
    connected: boolean;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const result = await testDbConnection();
        setConnectionStatus(result);
      } catch (error) {
        setConnectionStatus({
          success: false,
          connected: false,
          message: 'Error testing database connection'
        });
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-4 rounded-lg border p-6 shadow-md">
        <h1 className="text-2xl font-bold text-center">Database Connection Test</h1>
        
        {loading ? (
          <div className="text-center py-4">
            <p>Testing database connection...</p>
          </div>
        ) : connectionStatus ? (
          <div className={`p-4 rounded-md ${connectionStatus.success && connectionStatus.connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <h2 className="font-semibold">Connection Status:</h2>
            <p>{connectionStatus.message}</p>
            {!connectionStatus.connected && (
              <div className="mt-2">
                <p className="text-sm">
                  Make sure you have set the <code className="bg-gray-100 px-1 rounded">MONGODB_URI</code> in your environment variables.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <p>No connection status available</p>
          </div>
        )}
        
        <div className="pt-4">
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Retest Connection
          </button>
        </div>
      </div>
    </div>
  );
}