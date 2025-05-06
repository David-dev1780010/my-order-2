
import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import BottomNav from '@/components/common/BottomNav';
import { useApp } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import TokenDisplay from '@/components/common/TokenDisplay';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated, currentUser } = useApp();
  const isAdmin = currentUser?.role === 'admin';
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen flex-col items-center bg-indigo-50">
      {/* Responsive container - different max widths based on screen size */}
      <div className="w-full max-w-full md:max-w-5xl lg:max-w-6xl bg-white min-h-screen flex flex-col shadow-sm border border-gray-100">
        <Navbar />
        
        {/* Show token display for students in the header area */}
        {isAuthenticated && !isAdmin && (
          <div className="bg-indigo-50 px-4 py-2 flex justify-end">
            <TokenDisplay showAddButton={false} />
          </div>
        )}
        
        <div className="flex flex-1">
          {/* Admin Sidebar (visible only for admin and on non-mobile) */}
          {isAdmin && !isMobile && <AdminSidebar />}
          
          <div className={`flex-1 px-4 py-3 md:px-6 ${isMobile ? 'pb-20' : ''}`}>
            {children}
          </div>
        </div>
        
        {isMobile && isAuthenticated ? <BottomNav /> : <Footer />}
      </div>
    </div>
  );
};

export default MainLayout;
