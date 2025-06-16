import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../config/db.config.js';  

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

// Function to generate new tokens
export const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, accessTokenSecret, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, refreshTokenSecret, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

// Middleware to verify access token
export const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    console.error(`❌ No token provided`);
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, accessTokenSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(`❌ Invalid or expired access token`,error);
    return res.status(403).json({ message: 'Invalid or expired access token' });
  }
};

// Endpoint to refresh tokens
export const refreshTokenHandler = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    // Check if refresh token exists in the database
    const storedToken = await db.models.tokens.findOne({ where: { token: refreshToken } });
    if (!storedToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Verify and decode the refresh token
    const decoded = jwt.verify(refreshToken, refreshTokenSecret);

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens({ userId: decoded.userId });

    // Update the refresh token in the database
    await db.models.tokens.update({ token: newRefreshToken }, { where: { token: refreshToken } });

    return res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error(`❌ Error refreshing token:`, error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Example Usage in Routes
// import { authMiddleware, refreshTokenHandler } from './middleware/auth.middleware.js';
//
// app.get('/protected-route', authMiddleware, (req, res) => {
//   res.json({ message: 'This is a protected route', user: req.user });
// });
//
// app.post('/auth/refresh-token', refreshTokenHandler);