'use client';

import React from 'react';
import AdminDashboard from '@/components/admin-dashboard';
import ProtectedRoute from '@/components/protected-route';

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive complaint management system with real-time updates, 
            filtering capabilities, and email notifications.
          </p>
        </div>
        
        <AdminDashboard />
      </div>
    </ProtectedRoute>
  );
}