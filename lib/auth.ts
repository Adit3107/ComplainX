import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import User from '@/models/User';
import connectDB from '@/lib/mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'user' | 'admin';
}

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
};

export const getTokenFromRequest = (req: NextRequest): string | null => {
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
};

export const authenticateUser = async (req: NextRequest) => {
  try {
    await connectDB();
    
    const token = getTokenFromRequest(req);
    if (!token) {
      return { error: 'No token provided', status: 401 };
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return { error: 'Invalid token', status: 401 };
    }

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return { error: 'User not found', status: 401 };
    }

    return { user, decoded };
  } catch (error) {
    return { error: 'Authentication failed', status: 500 };
  }
};

export const requireRole = (allowedRoles: string[]) => {
  return (decoded: JWTPayload) => {
    if (!allowedRoles.includes(decoded.role)) {
      return { error: 'Insufficient permissions', status: 403 };
    }
    return null;
  };
};