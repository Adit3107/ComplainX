import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const authResult = await authenticateUser(req);
    
    if (authResult.error) {
      return NextResponse.json(
        {
          success: false,
          error: authResult.error,
        },
        { status: authResult.status }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        user: authResult.user,
      },
    });
  } catch (error: any) {
    console.error('GET /api/auth/me error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get user info',
        message: error.message,
      },
      { status: 500 }
    );
  }
}