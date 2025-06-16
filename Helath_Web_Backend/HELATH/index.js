import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './src/config/db.config.js';

dotenv.config();

const PORT = process.env.PORT || 8080;

// Connect DB and start server
(async () => {
  try {
    await connectDB(); // <--- Ensure DB is connected first
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
  }
})();
