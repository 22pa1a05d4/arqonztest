const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    console.log('🔐 Auth middleware - Headers:', req.headers);
    console.log('🔐 Auth middleware - Authorization header:', req.header('Authorization'));
    console.log('🔐 Auth middleware - JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET');
    
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      console.log('🔐 Auth middleware - No token found');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    console.log('🔐 Auth middleware - Token found:', token.substring(0, 20) + '...');
    console.log('🔐 Auth middleware - Full token length:', token.length);
    
    // Try to decode without verification first to see the payload
    try {
      const decodedWithoutVerification = jwt.decode(token);
      console.log('🔐 Auth middleware - Token payload (without verification):', decodedWithoutVerification);
    } catch (decodeError) {
      console.log('🔐 Auth middleware - Error decoding token:', decodeError.message);
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    console.log('🔐 Auth middleware - Token decoded successfully:', decoded);
    
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      console.log('🔐 Auth middleware - User not found for ID:', decoded.userId);
      return res.status(401).json({ message: 'Token is not valid' });
    }

    console.log('🔐 Auth middleware - User found:', user.email);
    req.user = user;
    next();
  } catch (error) {
    console.log('🔐 Auth middleware - JWT Verification Error:', error.message);
    console.log('🔐 Auth middleware - Error type:', error.name);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;








