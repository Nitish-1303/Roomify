import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './components/ui/toast';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Rooms from './pages/Rooms';
import Bookings from './pages/Bookings';
import Analytics from './pages/Analytics';
import AuditLogs from './pages/AuditLogs';
import Reports from './pages/Reports';
import UserManagement from './pages/UserManagement';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import SmartScheduler from './pages/SmartScheduler';
import Maintenance from './pages/Maintenance';
import FeatureDemo from './pages/FeatureDemo';
import TestimonialsDemo from './pages/TestimonialsDemo';
import FeaturesPage from './pages/FeaturesPage';
import FAQPage from './pages/FAQPage';
import FileUploadExamples from './pages/FileUploadExamples';
import FileInputDemo from './pages/FileInputDemo';
import LogoShowcase from './pages/LogoShowcase';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <div className="min-h-screen gradient-primary">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <Navbar />
                  <Routes>
                    <Route path="/rooms" element={<Rooms />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/smart-scheduler" element={<SmartScheduler />} />
                    <Route path="/maintenance" element={<Maintenance />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/audit-logs" element={<AuditLogs />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/users" element={<UserManagement />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/feature-demo" element={<FeatureDemo />} />
                    <Route path="/testimonials" element={<TestimonialsDemo />} />
                    <Route path="/features" element={<FeaturesPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/file-upload-examples" element={<FileUploadExamples />} />
                    <Route path="/file-input-demo" element={<FileInputDemo />} />
                    <Route path="/logo-showcase" element={<LogoShowcase />} />
                    <Route path="/" element={<Navigate to="/rooms" />} />
                  </Routes>
                </PrivateRoute>
              }
            />
          </Routes>
          </div>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
