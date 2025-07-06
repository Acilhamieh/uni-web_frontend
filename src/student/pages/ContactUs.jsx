import React, { useState } from 'react';
import emailjs from "emailjs-com";
import {ToastContainer , toast} from 'react-toastify';
import { 
  FaEnvelope, FaMapMarkerAlt, FaPhone,
  FaGraduationCap, FaBook, FaLaptopCode,
  FaBrain, FaUniversity, FaChalkboardTeacher
} from 'react-icons/fa';
import '../styles/ContactUs.css';

export default function ContactUs(){
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const [status, setStatus] = useState("");

  const validateForm = () => {
    let tempErrors = {};
    
    // First Name validation
    if (!formData.firstName.trim()) {
      tempErrors.firstName = 'First Name is required';
    } else if (formData.firstName.length < 3) {
      tempErrors.firstName = 'First Name must be at least 3 characters';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      tempErrors.lastName = 'Last Name is required';
    } else if (formData.lastName.length < 3) {
      tempErrors.lastName = 'Last Name must be at least 3 characters';
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
      
      console.log('Form submitted:', formData);

      // Body to send to EmailJS
    const templateParams = {
      from_firstname: formData.firstName,
      from_lastname: formData.lastName,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        "service_8vx3byk", // Replace with your EmailJS service ID
        "template_5l1kxg5", // Replace with your EmailJS template ID
        templateParams,
        "hfrDkxJrBUmEF__Z6" // Replace with your EmailJS public key
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setStatus("Message sent successfully!");
          toast.success("Message sent successfully!");

          //reset form data
          setFormData({ firstName: "", lastName: "", email: "", message: "" });
        },
        (err) => {
          console.log("FAILED...", err);
          setStatus("Failed to send message.");
          toast.error("Failed to send message. Please try again later.");

        }
      );
    }
  };


  return (
    <>
    <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

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
          <button type="submit" className='btn-bl'>Send Message</button>
        </form>
      </div>
    </div>
    </>
  );
};

