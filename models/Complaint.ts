import mongoose, { Schema, Document } from 'mongoose';

export interface IComplaint extends Document {
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  dateSubmitted: Date;
  userEmail?: string;
  userId?: string;
}

const ComplaintSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a complaint title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a complaint description'],
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters'],
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Product', 'Service', 'Support', 'Billing', 'Technical', 'Other'],
  },
  priority: {
    type: String,
    required: [true, 'Please select a priority'],
    enum: ['Low', 'Medium', 'High'],
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending',
  },
  dateSubmitted: {
    type: Date,
    default: Date.now,
  },
  userEmail: {
    type: String,
    trim: true,
    lowercase: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Create indexes for better query performance
ComplaintSchema.index({ status: 1 });
ComplaintSchema.index({ priority: 1 });
ComplaintSchema.index({ category: 1 });
ComplaintSchema.index({ dateSubmitted: -1 });

export default mongoose.models.Complaint || mongoose.model<IComplaint>('Complaint', ComplaintSchema);