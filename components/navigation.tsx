'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, MessageSquare, Shield, FileText, Home, LogOut, User } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';


export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  const getNavigation = () => {
    if (!user) return [{ name: 'Home', href: '/', icon: Home }];
    
    if (user.role === 'admin') {
      return [
        { name: 'Admin Dashboard', href: '/admin', icon: Shield },
      ];
    } else {
      return [
        { name: 'Submit Complaint', href: '/submit', icon: FileText },
      ];
    }
  };

  const navigation = getNavigation();

  if (loading) {
    return (
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-2 bg-teal-600 rounded-lg">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ComplainX</span>
            </Link>
            <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-2 bg-teal-600 rounded-lg">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ComplainX</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {user ? (
              <>
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link key={item.name} href={item.href}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className={`flex items-center space-x-2 transition-all duration-200 ${
                          isActive 
                            ? 'bg-teal-600 text-white shadow-md' 
                            : 'text-gray-700 hover:text-teal-600 hover:bg-teal-50'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Button>
                    </Link>
                  );
                })}
                
                <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                    <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-medium">
                      {user.role}
                    </span>
                  </div>
                  <Button
                    onClick={logout}
                    variant="outline"
                    size="sm"
                    className="text-gray-700 hover:text-red-600 hover:border-red-200"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-teal-600 hover:bg-teal-50">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  {user ? (
                    <>
                      <div className="pb-4 border-b border-gray-200">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                          <User className="h-4 w-4" />
                          <span>{user.name}</span>
                        </div>
                        <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-medium">
                          {user.role}
                        </span>
                      </div>
                      
                      {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        
                        return (
                          <Link 
                            key={item.name} 
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                          >
                            <Button
                              variant={isActive ? "default" : "ghost"}
                              className={`w-full justify-start flex items-center space-x-3 transition-all duration-200 ${
                                isActive 
                                  ? 'bg-teal-600 text-white' 
                                  : 'text-gray-700 hover:text-teal-600 hover:bg-teal-50'
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                              <span>{item.name}</span>
                            </Button>
                          </Link>
                        );
                      })}
                      
                      <Button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        variant="outline"
                        className="w-full justify-start text-gray-700 hover:text-red-600 hover:border-red-200"
                      >
                        <LogOut className="h-5 w-5 mr-3" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-teal-600 hover:bg-teal-50">
                          Login
                        </Button>
                      </Link>
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        <Button className="w-full justify-start bg-teal-600 hover:bg-teal-700 text-white">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}