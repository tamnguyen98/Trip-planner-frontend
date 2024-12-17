import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
}

interface PrivacySettings {
  profile_visibility: 'public' | 'friends' | 'private';
  itinerary_default: 'public' | 'listed' | 'private';
}

interface ProfileContextType {
  user: User | null;
  privacySettings: PrivacySettings;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  updatePrivacySettings: (setting: keyof PrivacySettings, value: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    bio: 'Travel enthusiast',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
  });

  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profile_visibility: 'public',
    itinerary_default: 'private'
  });

  const updateProfile = async (data: Partial<User>) => {
    // TODO: Implement API call
    setUser(prev => prev ? { ...prev, ...data } : null);
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    // TODO: Implement API call
    console.log('Password updated');
  };

  const updatePrivacySettings = (setting: keyof PrivacySettings, value: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <ProfileContext.Provider
      value={{
        user,
        privacySettings,
        updateProfile,
        updatePassword,
        updatePrivacySettings
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfileContext must be used within a ProfileProvider');
  }
  return context;
};