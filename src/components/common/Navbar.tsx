
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Book, Menu, X, LogIn, UserPlus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar: React.FC = () => {
  const { currentUser, isAuthenticated, logout } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <Book className="h-7 w-7 text-quiz-purple" />
            <span className="ml-2 text-lg font-bold bg-gradient-to-r from-quiz-purple to-blue-500 bg-clip-text text-transparent">
              QuizMaster
            </span>
          </Link>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <Link to="/" className="flex items-center mb-6">
                  <Book className="h-6 w-6 text-quiz-purple" />
                  <span className="ml-2 text-xl font-bold bg-gradient-to-r from-quiz-purple to-blue-500 bg-clip-text text-transparent">
                    QuizMaster
                  </span>
                </Link>
                <div className="flex flex-col space-y-4">
                  {currentUser?.role === 'admin' ? (
                    <>
                      <Link to="/admin/dashboard" className="text-gray-700 hover:text-quiz-purple px-2 py-1">
                        Dashboard
                      </Link>
                      <Link to="/admin/quizzes" className="text-gray-700 hover:text-quiz-purple px-2 py-1">
                        Quizzes
                      </Link>
                      <Link to="/admin/current-affairs" className="text-gray-700 hover:text-quiz-purple px-2 py-1">
                        Current Affairs
                      </Link>
                      <Link to="/admin/exams" className="text-gray-700 hover:text-quiz-purple px-2 py-1">
                        Exams
                      </Link>
                      <Link to="/admin/students" className="text-gray-700 hover:text-quiz-purple px-2 py-1">
                        Students
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/dashboard" className="text-gray-700 hover:text-quiz-purple px-2 py-1">
                        Dashboard
                      </Link>
                      <Link to="/quizzes" className="text-gray-700 hover:text-quiz-purple px-2 py-1">
                        Quizzes
                      </Link>
                      <Link to="/current-affairs" className="text-gray-700 hover:text-quiz-purple px-2 py-1">
                        Current Affairs
                      </Link>
                      <Link to="/exams" className="text-gray-700 hover:text-quiz-purple px-2 py-1">
                        Exams
                      </Link>
                    </>
                  )}
                  <div className="border-t my-2"></div>
                  <Link to={currentUser?.role === 'admin' ? '/admin/profile' : '/profile'} className="text-gray-700 hover:text-quiz-purple px-2 py-1">
                    Profile
                  </Link>
                  <button onClick={logout} className="text-left text-gray-700 hover:text-quiz-purple px-2 py-1">
                    Logout
                  </button>
                </div>
              </SheetContent>
            </Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser?.avatarUrl} />
                    <AvatarFallback className="bg-gradient-to-r from-quiz-purple to-blue-500 text-white text-xs">
                      {currentUser?.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to={currentUser?.role === 'admin' ? '/admin/profile' : '/profile'} className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/login" className="flex items-center gap-1">
                <LogIn className="h-3.5 w-3.5" />
                Login
              </Link>
            </Button>
            <Button variant="gradient" size="sm" asChild className="shadow-md">
              <Link to="/register" className="flex items-center gap-1">
                <UserPlus className="h-3.5 w-3.5" />
                Register
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
