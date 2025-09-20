'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Send, FileText } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface ComplaintFormData {
  title: string;
  description: string;
  category: string;
  priority: string;
}

const categories = ['Product', 'Service', 'Support', 'Billing', 'Technical', 'Other'];
const priorities = [
  { value: 'Low', label: 'Low', color: 'text-emerald-600' },
  { value: 'Medium', label: 'Medium', color: 'text-amber-600' },
  { value: 'High', label: 'High', color: 'text-rose-600' },
];

export default function ComplaintForm() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<ComplaintFormData>({
    title: '',
    description: '',
    category: '',
    priority: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Complaint submitted successfully!', {
          description: 'We\'ll review your complaint and get back to you soon.',
        });
        setFormData({
          title: '',
          description: '',
          category: '',
          priority: '',
        });
      } else {
        toast.error('Failed to submit complaint', {
          description: result.error || 'Please try again later.',
        });
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
      toast.error('Network error', {
        description: 'Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="text-center pb-8">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">Submit a Complaint</CardTitle>
        <CardDescription className="text-gray-600">
          We take your feedback seriously. Please provide details about your concern and we'll address it promptly.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
              Complaint Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Brief summary of your complaint"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              maxLength={100}
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="text-xs text-gray-500 text-right">
              {formData.title.length}/100 characters
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Please provide detailed information about your complaint..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              maxLength={1000}
              rows={5}
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="text-xs text-gray-500 text-right">
              {formData.description.length}/1000 characters
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
              Category <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700">
              Priority <span className="text-red-500">*</span>
            </Label>
            <RadioGroup
              value={formData.priority}
              onValueChange={(value) => setFormData({ ...formData, priority: value })}
              className="flex gap-6"
            >
              {priorities.map((priority) => (
                <div key={priority.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={priority.value}
                    id={priority.value}
                    className="transition-all duration-200"
                  />
                  <Label
                    htmlFor={priority.value}
                    className={`cursor-pointer font-medium ${priority.color} transition-all duration-200 hover:opacity-70`}
                  >
                    {priority.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-sm text-blue-800">
              <span className="font-medium">Submitting as:</span>
              <span>{user.email}</span>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting || !formData.title || !formData.description || !formData.category || !formData.priority}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Complaint
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}