import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';
import User from '@/models/User';
import connectDB from '@/lib/mongodb';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

const secret = new TextEncoder().encode(JWT_SECRET);

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'user' | 'admin';
}

export const generateToken = async (payload: JWTPayload): Promise<string> => {
  return await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(process.env.JWT_EXPIRES_IN || '7d')
    .sign(secret);
};

export const verifyToken = async (token: string): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as JWTPayload;
  } catch (error) {
    return null;
  }
};

export const getTokenFromRequest = (req: NextRequest): string | null => {
  // Check Authorization header
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Check cookies as fallback
  return req.cookies.get('token')?.value || null;
};

export const authenticateUser = async (req: NextRequest) => {
  try {
    await connectDB();
    
    const token = getTokenFromRequest(req);
    if (!token) {
      return { error: 'No token provided', status: 401 };
    }

    const decoded = await verifyToken(token);
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
