'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Shield, 
  Mail, 
  Clock, 
  Users, 
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  BarChart3
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

const features = [
  {
    icon: FileText,
    title: 'Easy Submission',
    description: 'Submit complaints quickly with our intuitive form system.',
  },
  {
    icon: Mail,
    title: 'Email Notifications',
    description: 'Automatic email notifications for new submissions and updates.',
  },
  {
    icon: Clock,
    title: 'Real-time Tracking',
    description: 'Track complaint status from submission to resolution.',
  },
  {
    icon: Shield,
    title: 'Admin Dashboard',
    description: 'Comprehensive admin interface for complaint management.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description: 'Detailed insights and reporting on complaint patterns.',
  },
  {
    icon: Users,
    title: 'Multi-user Support',
    description: 'Support for multiple users and role-based access.',
  },
];

const stats = [
  { label: 'Active Users', value: '10,000+', icon: Users },
  { label: 'Complaints Processed', value: '50,000+', icon: MessageSquare },
  { label: 'Resolution Rate', value: '94%', icon: CheckCircle2 },
  { label: 'Average Response Time', value: '2 hours', icon: Clock },
];

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // Redirect based on user role
      if (user.role === 'admin') {
        router.push('/admin');
      } else if (user.role === 'user') {
        router.push('/submit');
      }
    }
  }, [user, loading, router]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is logged in, they will be redirected, so this is only for non-logged-in users
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Welcome Section */}
      <section className="text-center space-y-8 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-8 lg:p-12">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Welcome to <span className="text-teal-600">ComplainX</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive platform for submitting, tracking, and managing customer complaints 
            with real-time notifications and powerful admin tools.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/login">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-lg px-8 py-3">
              Submit Complaint
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              <Shield className="mr-2 h-5 w-5" />
              Admin Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Customer Complaint
            <span className="text-teal-600"> Management</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get started by signing in to access your personalized dashboard
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center space-y-3">
                <div className="inline-flex p-3 bg-teal-100 rounded-full">
                  <Icon className="h-8 w-8 text-teal-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage customer complaints efficiently and effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-2 border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex p-3 bg-teal-100 rounded-full mx-auto mb-4">
                    <Icon className="h-8 w-8 text-teal-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-8 lg:p-12">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple steps to submit and manage complaints effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-600 text-white rounded-full text-xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Submit</h3>
            <p className="text-gray-600">
              Fill out our simple form with your complaint details, category, and priority level.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-600 text-white rounded-full text-xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Track</h3>
            <p className="text-gray-600">
              Monitor your complaint status in real-time as our team processes your request.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-600 text-white rounded-full text-xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Resolve</h3>
            <p className="text-gray-600">
              Receive updates and resolution notifications via email throughout the process.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-600 rounded-2xl p-8 lg:p-12 text-center text-white">
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust our complaint management system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" variant="secondary" className="bg-white text-teal-600 hover:bg-gray-100 text-lg px-8 py-3">
                Submit Your First Complaint
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}