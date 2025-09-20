import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Complaint from '@/models/Complaint';
import { sendNewComplaintNotification } from '@/lib/email';
import { authenticateUser, requireRole } from '@/lib/auth';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// GET /api/complaints - Get all complaints with optional filtering
export async function GET(req: NextRequest) {
  try {
    // Authenticate user
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

    // Check if user is admin
    const roleCheck = requireRole(['admin'])(authResult.decoded!);
    if (roleCheck) {
      return NextResponse.json(
        {
          success: false,
          error: roleCheck.error,
        },
        { status: roleCheck.status }
      );
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const category = searchParams.get('category');

    let filter: any = {};
    
    if (status && status !== 'all') {
      filter.status = status;
    }
    if (priority && priority !== 'all') {
      filter.priority = priority;
    }
    if (category && category !== 'all') {
      filter.category = category;
    }

    const complaints = await Complaint.find(filter)
      .sort({ dateSubmitted: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: complaints,
    });
  } catch (error: any) {
    console.error('GET /api/complaints error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch complaints',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// POST /api/complaints - Create new complaint
export async function POST(req: NextRequest) {
  try {
    // Authenticate user
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

    // Check if user has permission to create complaints (both user and admin can create)
    const roleCheck = requireRole(['user', 'admin'])(authResult.decoded!);
    if (roleCheck) {
      return NextResponse.json(
        {
          success: false,
          error: roleCheck.error,
        },
        { status: roleCheck.status }
      );
    }

    await connectDB();

    const body = await req.json();
    const { title, description, category, priority } = body;

    // Validate required fields
    if (!title || !description || !category || !priority) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Create complaint
    const complaint = await Complaint.create({
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      userEmail: authResult.user!.email,
      userId: authResult.user!._id,
    });

    // Send email notification
    try {
      await sendNewComplaintNotification(complaint);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        data: complaint,
        message: 'Complaint submitted successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('POST /api/complaints error:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: Object.values(error.errors).map((err: any) => err.message),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create complaint',
        message: error.message,
      },
      { status: 500 }
    );
  }
}