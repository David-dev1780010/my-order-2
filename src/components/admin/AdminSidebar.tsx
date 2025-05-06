
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BookOpenCheck,
  GraduationCap,
  BookOpen,
  Calendar,
  Users,
  Wallet,
  Settings,
  Image
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const menuItems = [
    { 
      title: 'Dashboard', 
      icon: LayoutDashboard, 
      path: '/admin/dashboard' 
    },
    { 
      title: 'Classes', 
      icon: GraduationCap, 
      path: '/admin/classes' 
    },
    { 
      title: 'Subjects', 
      icon: BookOpenCheck, 
      path: '/admin/subjects' 
    },
    { 
      title: 'Quizzes', 
      icon: BookOpen, 
      path: '/admin/quizzes' 
    },
    { 
      title: 'Current Affairs', 
      icon: BookOpen, 
      path: '/admin/current-affairs' 
    },
    { 
      title: 'Exams', 
      icon: Calendar, 
      path: '/admin/exams' 
    },
    { 
      title: 'Students', 
      icon: Users, 
      path: '/admin/students' 
    },
    { 
      title: 'Tokens', 
      icon: Wallet, 
      path: '/admin/tokens' 
    },
    { 
      title: 'Advertisements', 
      icon: Image, 
      path: '/admin/advertisements' 
    }
  ];
  
  return (
    <div className="hidden md:flex flex-col w-60 bg-white border-r border-gray-200 h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-quiz-purple">Admin Panel</h2>
      </div>
      
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
              isActive(item.path) 
                ? "bg-indigo-50 text-indigo-700" 
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5",
              isActive(item.path) ? "text-indigo-600" : "text-gray-500"
            )} />
            <span>{item.title}</span>
            {isActive(item.path) && (
              <div className="ml-auto w-1.5 h-5 bg-indigo-600 rounded-full"></div>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
