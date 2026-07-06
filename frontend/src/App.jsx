import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Planner from './pages/Planner';
import Auth from './pages/Auth';
import AccountInfo from './pages/AccountInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/planner/:id" element={<Planner />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/account" element={<AccountInfo />} />
      </Routes>
    </Router>
  );
}

export default App; // Trigger reload
