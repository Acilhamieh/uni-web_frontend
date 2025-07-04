import React from 'react';
import './TeamCard.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function TeamCard({ name, departement, description, img, skills }) {
    return (
        <div className="team-card">
            <div className="card-left">
                <div className="profile-img">
                    <img src={img.src} alt={img.alt} />
                </div>
            </div>
            <div className="card-right">
                <h3 className='small-heading'>{name}</h3>
                <span className="role">{departement}</span>
                <p className='small-text'>{description}</p>
                <div className="skills">
                    {skills.map((skill, index) => (
                        <span key={index}>{skill}</span>
                    ))}
                </div>

                <div className="social-links">
                    <a href="#" aria-label="Github"><FaGithub /></a>
                    <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                    <a href="#" aria-label="Email"><MdEmail /></a>
                </div>

            </div>
        </div>
    );
}