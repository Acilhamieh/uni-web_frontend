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
    title: "Final Student Projects",
    description: "Explore final projects in Word or PowerPoint formats.",
    icon: <FaFolderOpen />,
  },
  {
    title: "Internship Opportunities",
    description: "Find companies offering internships and contact info.",
    icon: <FaBriefcase />,

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
];

const ServiceCard = ({ title, description, icon }) => (
  <div className="service-card">
    <div className="icon">{icon}</div>
    <h3 className="small-heading">{title}</h3>
    <p className="small-text">{description}</p>
  </div>
);

export default function Services ({ home }){
  
  const displayedServices = home ? services.slice(0, 3) : services;

  return (
    <div className="services-section">
      <h2 className="section-title">What We <span className="highlight-bl">Offre</span></h2>
      <div className="services-scroll">
        {displayedServices.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
  
};


