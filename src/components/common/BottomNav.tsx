
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Award, User, Bell, Book } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useApp();
  const isAdmin = currentUser?.role === 'admin';
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const baseItemClasses = "flex flex-col items-center justify-center text-xs py-1";
  const activeClass = "text-indigo-600";
  const inactiveClass = "text-gray-500";
  
  const navItems = isAdmin 
    ? [
        { path: '/admin/dashboard', label: 'Home', icon: Home },
        { path: '/admin/classes', label: 'Classes', icon: BookOpen },
        { path: '/admin/quizzes', label: 'Quizzes', icon: Award },
        { path: '/admin/students', label: 'Students', icon: User },
        { path: '/admin/current-affairs', label: 'News', icon: Bell },
      ]
    : [
        { path: '/dashboard', label: 'Home', icon: Home },
        { path: '/classes', label: 'Classes', icon: BookOpen },
        { path: '/quizzes', label: 'Quizzes', icon: Award },
        { path: '/current-affairs', label: 'News', icon: Bell },
        { path: '/profile', label: 'Profile', icon: User },
      ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-md">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              baseItemClasses,
              isActive(item.path) ? activeClass : inactiveClass
            )}
          >
            <item.icon className={cn("h-5 w-5 mb-1", isActive(item.path) ? "text-indigo-600" : "text-gray-500")} />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
