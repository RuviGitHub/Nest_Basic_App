import express from 'express';
import { rateLimitMiddleware, corsMiddleware, helmetMiddleware, compressionMiddleware, jsonBodyParserMiddleware } from './src/middleware/security.middleware.js';
import httpLogger from './src/middleware/http-logger.middleware.js';

// Initialize Express app
const app = express();

// Middleware setup
app.disable('x-powered-by');
app.use(httpLogger);
app.use(corsMiddleware);
app.use(helmetMiddleware);
app.use(compressionMiddleware);
app.use(jsonBodyParserMiddleware);
app.use(rateLimitMiddleware);

// Health-Check route
app.get('/health-check', (req, res) => {
  res.status(200).json({ message: 'Server is up & running!' });
  console.log(`ℹ️  GET /health-check route accessed`);
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Resource not found' });
});

// Handle server errors
app.use((err, req, res) => {
  console.error(`❌  Server error:`, err);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;