import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

interface ConnectionState {
  isConnected?: number | boolean;
}

const connectionState: ConnectionState = {};

async function connect(): Promise<void> {
  if (connectionState.isConnected) {
    console.log('Already connected');
    return;
  }

  try {
    if (mongoose.connections.length > 0) {
      connectionState.isConnected = mongoose.connections[0].readyState;

      if (connectionState.isConnected === 1) {
        console.log('Use previous connection');
        return;
      }

      await mongoose.disconnect();
    }

    const db = await mongoose.connect(MONGO_URI!);
    console.log('New connection');
    connectionState.isConnected = db.connections[0].readyState;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function disconnect(): Promise<void> {
  if (connectionState.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connectionState.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
}

const db = { connect, disconnect };
export default db;
