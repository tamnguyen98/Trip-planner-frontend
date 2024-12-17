import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  User, 
  Settings, 
  Shield, 
  Bell, 
  Key,
  LogOut,
  Bookmark,
  Share2
} from 'lucide-react';

const navigation = [
  { name: 'Personal Info', href: '/profile', icon: User, exact: true },
  { name: 'Security', href: '/profile/security', icon: Key },
  { name: 'Privacy', href: '/profile/privacy', icon: Shield },
  { name: 'Notifications', href: '/profile/notifications', icon: Bell },
  { name: 'Preferences', href: '/profile/preferences', icon: Settings },
  { name: 'Saved Itineraries', href: '/profile/saved', icon: Bookmark },
  { name: 'Shared With Me', href: '/profile/shared', icon: Share2 },
];

export const ProfileSidebar = () => {
  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logging out...');
  };

  return (
    <nav className="space-y-1">
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          end={item.exact}
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              isActive
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`
          }
        >
          <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
          {item.name}
        </NavLink>
      ))}
      
      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md w-full mt-4"
      >
        <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
        Log Out
      </button>
    </nav>
  );
};