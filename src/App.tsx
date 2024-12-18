import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { HomePage } from './pages/HomePage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { ItineraryEditorPage } from './pages/ItineraryEditorPage';
import { ItineraryDetailPage } from './pages/ItineraryDetailPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { PersonalInfoForm } from './pages/profile/components/PersonalInfoForm';
import { SecurityForm } from './pages/profile/components/SecurityForm';
import { PrivacySettings } from './pages/profile/components/PrivacySettings';

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Protected Routes */}
            <Route path="/home" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/search" element={
              <ProtectedRoute>
                <SearchResultsPage />
              </ProtectedRoute>
            } />
            <Route path="/itinerary/new" element={
              <ProtectedRoute>
                <ItineraryEditorPage />
              </ProtectedRoute>
            } />
            <Route path="/itinerary/:id" element={
                <ItineraryDetailPage />
            } />
            <Route path="/itinerary/:id/edit" element={
              <ProtectedRoute>
                <ItineraryEditorPage />
              </ProtectedRoute>
            } />
            
            {/* Profile Routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }>
              <Route index element={<PersonalInfoForm />} />
              <Route path="security" element={<SecurityForm />} />
              <Route path="privacy" element={<PrivacySettings />} />
            </Route>
          </Routes>
        </Router>
      </ProfileProvider>
    </AuthProvider>
  );
}