import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const mongoUri = process.env.DATABASE_URL;

  if (!mongoUri) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  try {
    await mongoose.connect(mongoUri, {
      maxPoolSize: 100, // Max concurrent connections for M10
      minPoolSize: 10,  // Maintain at least 10 idle connections
      serverSelectionTimeoutMS: 10000, // Time to find a suitable server (10 seconds)
      socketTimeoutMS: 30000,         // Close inactive sockets after 30 seconds
      waitQueueTimeoutMS: 5000,       // Wait time for queue to get connections
      heartbeatFrequencyMS: 10000,    // Check connection health every 10 seconds
    });

    console.log(`✅ Connected to MongoDB Database!`);
  } catch (error) {
    console.error(`❌ MongoDB connection error:`, error);
    process.exit(1); // Stop server on DB failure
  }
};

export default connectDB;
