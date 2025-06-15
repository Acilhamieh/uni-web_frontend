import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AboutUsPg from './pages/AboutUsPg';
import ServicesPg from './pages/ServicesPg';
import ContactUsPg from './pages/ContactUsPg';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<AboutUsPg />} />
        <Route path="/services" element={<ServicesPg />} />
        <Route path="/contactus" element={<ContactUsPg />} />
      </Routes>
    </Router>
  );
}