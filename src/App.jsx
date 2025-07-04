import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './student/layouts/MainLayout';

// Pages
import Home from './student/pages/Home';
import Login from './student/pages/Login';
import Signup from './student/pages/Signup';
import AboutUsPg from './student/pages/AboutUsPg';
import ServicesPg from './student/pages/ServicesPg';
import ContactUsPg from './student/pages/ContactUsPg';

// Admin
import AdminApp from './admin/App';

// Styles
import './student/styles/global.css';

export default function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: 'var(--main-color2)',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#2e7d32',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#d32f2f',
              secondary: '#fff',
            },
          },
        }}
      />
    <Router>
      <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUsPg />} />
        <Route path="/services" element={<ServicesPg />} />
        <Route path="/contactus" element={<ContactUsPg />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </Router>
    </>
  );
}