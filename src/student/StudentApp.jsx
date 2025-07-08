import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import ContactUs from './pages/ContactUs';
import News from './pages/News';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Sessions from './pages/Sessions';
import Trainees from './pages/Trainees';
import Projects from './pages/Projects';
import AboutMajor from './pages/AboutMajor';

// Styles
import './styles/global.css';

export default function StudentApp() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="services" element={<Services />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route path="news" element={<News />} />
        <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetails />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="trainees" element={<Trainees />} />
          <Route path="projects" element={<Projects />} />
          <Route path="aboutmajor" element={<AboutMajor />} />
        <Route path="*" element={<Navigate to="home" replace />} />
      </Route>
    </Routes>
  );
}
