import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('🔐 Incoming Authorization Header:', authHeader); // ✅ Log header

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ No token or invalid format');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  console.log('📦 Extracted Token:', token); // ✅ Log token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token Decoded:', decoded); // ✅ Log decoded payload

    req.userId = decoded.id; // 🔁 Use consistent key like "userId"
    next();
  } catch (err) {
    console.error('❌ Token verification failed:', err.message);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
