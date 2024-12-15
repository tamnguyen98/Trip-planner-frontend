import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { HomePage } from './pages/HomePage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { ItineraryEditorPage } from './pages/ItineraryEditorPage';
import { ItineraryDetailPage } from './pages/ItineraryDetailPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/itinerary/new" element={<ItineraryEditorPage />} />
        <Route path="/itinerary/:id" element={<ItineraryDetailPage />} />
        <Route path="/itinerary/:id/edit" element={<ItineraryEditorPage />} />
      </Routes>
    </Router>
  );
}