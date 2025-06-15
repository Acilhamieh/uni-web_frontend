import React, { useState } from 'react';
import { 
  FaEnvelope, FaMapMarkerAlt, FaPhone,
  FaGraduationCap, FaBook, FaLaptopCode,
  FaBrain, FaUniversity, FaChalkboardTeacher
} from 'react-icons/fa';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      tempErrors.name = 'Name must be at least 3 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email';
    }

    // Message validation
    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      tempErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Proceed with form submission
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="contact-section">
      <div className="animated-background">
        <FaGraduationCap className="bg-icon icon1" />
        <FaBook className="bg-icon icon2" />
        <FaLaptopCode className="bg-icon icon3" />
        <FaBrain className="bg-icon icon4" />
        <FaUniversity className="bg-icon icon5" />
        <FaChalkboardTeacher className="bg-icon icon6" />
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2 className='meduim-heading'>Get in touch with <span className="highlight-bl">Daliluka</span></h2>
          <p className='small-text'>Feel free to reach out to us</p>
          <div className="info-items">
            <div className="info-item">
              <FaEnvelope />
              <span>dalilak@example.com</span>
            </div>
            <div className="info-item">
              <FaPhone />
              <span>+1 234 567 890</span>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt />
              <span>Faculty of technology</span>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="name-row">
            <div className="form-group">
              <input 
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required 
              />
              <label>First Name</label>
            </div>
            <div className="form-group">
              <input 
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required 
              />
              <label>Last Name</label>
            </div>
          </div>
          <div className="form-group">
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required 
            />
            <label>Name</label>
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
            />
            <label>Email</label>
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <textarea 
              rows="4" 
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <label>Message</label>
            {errors.message && <span className="error">{errors.message}</span>}
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
