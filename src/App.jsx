import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './auth/pages/Login';
import Signup from './auth/pages/Signup';

// Student
import StudentApp from './student/StudentApp';

// Admin
import AdminApp from './admin/AdminApp';

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
          <Route path="/" element={<Login />} />
          <Route path="/student/*" element={<StudentApp />} />

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