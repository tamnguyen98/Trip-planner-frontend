import React from 'react';
import { Shield, Eye, Globe, Users } from 'lucide-react';
import { useProfileContext } from '../../../contexts/ProfileContext';

export const PrivacySettings = () => {
  const { privacySettings, updatePrivacySettings } = useProfileContext();

  const settings = [
    {
      id: 'profile_visibility',
      title: 'Profile Visibility',
      description: 'Control who can see your profile information',
      icon: Eye,
      options: [
        { value: 'public', label: 'Public', icon: Globe },
        { value: 'friends', label: 'Friends Only', icon: Users },
        { value: 'private', label: 'Private', icon: Shield }
      ]
    },
    {
      id: 'itinerary_default',
      title: 'Default Itinerary Privacy',
      description: 'Set the default privacy level for new itineraries',
      icon: Shield,
      options: [
        { value: 'public', label: 'Public', icon: Globe },
        { value: 'listed', label: 'Listed', icon: Users },
        { value: 'private', label: 'Private', icon: Shield }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Privacy Settings</h2>

      <div className="space-y-8">
        {settings.map((setting) => {
          // Ensure TypeScript understands that 'setting.id' is a valid key
          const settingId = setting.id as keyof typeof privacySettings;

          return (
            <div key={setting.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <setting.icon className="h-6 w-6 text-blue-600 mt-1" />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium">{setting.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {setting.description}
                  </p>
                  <div className="mt-4 space-y-3">
                    {setting.options.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center space-x-3"
                      >
                        <input
                          type="radio"
                          name={setting.id}
                          value={option.value}
                          checked={privacySettings[settingId] === option.value}
                          onChange={(e) =>
                            updatePrivacySettings(settingId, e.target.value)
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex items-center">
                          <option.icon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-700">
                            {option.label}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
