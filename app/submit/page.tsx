'use client';

import React from 'react';
import ComplaintForm from '@/components/complaint-form';
import ProtectedRoute from '@/components/protected-route';

export default function SubmitPage() {
  return (
    <ProtectedRoute requiredRole="user">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Submit Your Complaint
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We value your feedback and take every complaint seriously. 
            Please provide as much detail as possible to help us resolve your issue quickly.
          </p>
        </div>
        
        <ComplaintForm />
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">What happens next?</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start gap-2">
              <span className="font-semibold">1.</span>
              <span>Your complaint will be reviewed by our team within 24 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold">2.</span>
              <span>We'll send you email updates as we work on resolving your issue</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold">3.</span>
              <span>You'll receive a final notification once your complaint has been resolved</span>
            </li>
          </ul>
        </div>
      </div>
    </ProtectedRoute>
  );
}