import React from 'react';

import TeamCard from '../components/TeamCard';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import profile from "../assets/profile-photo.jpg";
import '../styles/AboutUs.css';

const teamMembers = [
    {
        name: "Raghad",
        departement: "Frontend Developer",
        description: "Responsible for the frontend design and user interface, ensuring a clear, accessible, and user-friendly experience. Passionate about creating intuitive digital solutions that enhance the student experience.",
        img: {
            src: profile,
            alt: "Raghad - Frontend Developer"
        },
        skills: ["React", "CSS", "UI/UX", "Responsive Design"]
    },
    {
        name: "Acil",
        departement: "Backend Developer",
        description: "Responsible for backend development, database structure, and the technical functionality of the system. Focused on building robust and efficient systems that power the platform.",
        img: {
            src: profile,
            alt: "Acil - Backend Developer"
        },
        skills: ["Node.js","Express.js" , "SupaBase", "API Design"]
    }
];

export default function AboutUs({home}) {
    const navigate = useNavigate();

    return (
        <section className={`about-us-container ${home && 'background-bl'}`}>
            <section className="about-header about-content">
                <h2 className='section-title'>About <span className="highlight-bl">Daliluka</span></h2>
                <p className="about-story meduim-text">
                    Born from the shared struggles of two Business Computing students,
                    Daliluka emerged as a solution to the challenges we faced in finding
                    university resources. Our mission is simple, to create the platform
                    we wished we had during our academic journey.
                </p>

                {home && (<button className="btn-bl" onClick={() => navigate('/aboutus')}>More About Daliluka →</button>)}
            </section>

            {!home && (
                <>
                    <section className='team-container about-content'>
                        <div className='team-header'>
                            <h2 className='meduim-heading'>Meet The Team Behind <span className="highlight-bl">Daliluka</span></h2>
                            <p className="team-intro small-text">
                                We're two passionate Business Computing students who transformed our academic challenges
                                into a solution that helps fellow students navigate their university journey.
                            </p>
                        </div>
                        <div className="team-grid">
                            {teamMembers.map((member, index) => (
                                <TeamCard key={index} {...member} />
                            ))}
                        </div>
                    </section>
                    <section className="mission-container about-content">
                        <h2 className='meduim-heading'><span className="highlight-bl">Daliluka</span> Vision</h2>
                        <div className="mission-statement small-text">
                            <span>Building a centralized hub for academic resources and past exam sessions</span>
                            <span>Providing comprehensive course information and study materials</span>
                            <span>Connecting students with internship opportunities</span>
                            <span>Making university life easier through accessible information</span>
                        </div>
                    </section>
                </>)}
        </section>
    );
}