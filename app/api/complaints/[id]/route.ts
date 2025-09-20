import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Complaint from '@/models/Complaint';
import { sendStatusUpdateNotification } from '@/lib/email';
import { authenticateUser, requireRole } from '@/lib/auth';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// PATCH /api/complaints/[id] - Update complaint status
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { id } = params;
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        {
          success: false,
          error: 'Status is required',
        },
        { status: 400 }
      );
    }

    // Get current complaint for email notification
    const currentComplaint = await Complaint.findById(id);
    if (!currentComplaint) {
      return NextResponse.json(
        {
          success: false,
          error: 'Complaint not found',
        },
        { status: 404 }
      );
    }

    const oldStatus = currentComplaint.status;

    // Update complaint
    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!complaint) {
      return NextResponse.json(
        {
          success: false,
          error: 'Complaint not found',
        },
        { status: 404 }
      );
    }

    // Send email notification if status changed
    if (oldStatus !== status) {
      try {
        await sendStatusUpdateNotification(complaint, oldStatus);
      } catch (emailError) {
        console.error('Failed to send status update email:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      data: complaint,
      message: 'Complaint updated successfully',
    });
  } catch (error: any) {
    console.error('PATCH /api/complaints/[id] error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update complaint',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE /api/complaints/[id] - Delete complaint
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { id } = params;

    const complaint = await Complaint.findByIdAndDelete(id);

    if (!complaint) {
      return NextResponse.json(
        {
          success: false,
          error: 'Complaint not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Complaint deleted successfully',
    });
  } catch (error: any) {
    console.error('DELETE /api/complaints/[id] error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete complaint',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// GET /api/complaints/[id] - Get single complaint
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { id } = params;

    const complaint = await Complaint.findById(id).lean();

    if (!complaint) {
      return NextResponse.json(
        {
          success: false,
          error: 'Complaint not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: complaint,
    });
  } catch (error: any) {
    console.error('GET /api/complaints/[id] error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch complaint',
        message: error.message,
      },
      { status: 500 }
    );
  }
}