import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Header } from '../../components/Header';
import { ProfileSidebar } from './components/ProfileSidebar';
import { ProfileProvider } from '../../contexts/ProfileContext';

export const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="md:w-64 flex-shrink-0">
              <ProfileSidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              <ProfileProvider>
                <Outlet />

              </ProfileProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};