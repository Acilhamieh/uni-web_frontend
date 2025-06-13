import React from "react";
import "./Services.css";
import { FaFileAlt, FaInfoCircle, FaBook, FaLink, FaFolderOpen, FaBriefcase } from "react-icons/fa";

const services = [
  {
    title: "Past Exams & Solutions",
    description: "Access previous exam sessions with solutions to help you prepare.",
    icon: <FaFileAlt />,
  },
  {
    title: "About Business Informatics",
    description: "Details about the major, universities, careers, and duration.",
    icon: <FaInfoCircle />,
  },
  {
    title: "Courses Offered",
    description: "List of courses with credits, hours, and instructor info.",
    icon: <FaBook />,
  },
  {
    title: "Learning Resources",
    description: "Helpful websites, YouTube playlists, and study materials.",
    icon: <FaLink />,
  },
  {
    title: "Final Student Projects",
    description: "Explore final projects in Word or PowerPoint formats.",
    icon: <FaFolderOpen />,
  },
  {
    title: "Internship Opportunities",
    description: "Find companies offering internships and contact info.",
    icon: <FaBriefcase />,
  },
];

const Services = () => {
  return (
    <div className="services-section">
      <h2 className="section-title">Our Services</h2>
      <div className="services-scroll">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;