import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './src/config/db.config.js';

dotenv.config();

const PORT = process.env.PORT || 8080;

// Connect DB and start server
(async () => {
  try {
    await connectDB(); // <--- Ensure DB is connected first
    //await seedInitialData(); // <--- Seed initial data after DB connection
    console.log('✅ Database connected and initial data seeded successfully.');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
  }
})();
