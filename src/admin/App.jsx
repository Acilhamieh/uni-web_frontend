import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Users from './pages/Users';
import Courses from './pages/Courses';
import Sessions from './pages/Sessions';
import Doctors from './pages/Doctors';
import References from './pages/References';
import News from './pages/News';
import Projects from './pages/Projects';
import Trainees from './pages/Trainees';

export default function AdminApp() {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Navigate to="users" replace />} />
        <Route path="users" element={<Users />} />
        <Route path="courses" element={<Courses />} />
        <Route path="sessions" element={<Sessions />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="references" element={<References />} />
        <Route path="news" element={<News />} />
        <Route path="projects" element={<Projects />} />
        <Route path="trainees" element={<Trainees />} />
        <Route path="*" element={<Navigate to="users" replace />} /> 
      </Routes>
    </AdminLayout>
  );
} 