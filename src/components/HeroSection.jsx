import './HeroSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBook,
    faGraduationCap,
    faPencil,
    faLightbulb,
    faCalculator,
    faChalkboardTeacher
} from '@fortawesome/free-solid-svg-icons';
import { Navigate, useNavigate } from 'react-router-dom';

export default function HeroSection() {
    return (
        <section className="hero-section">
            <div className="floating-icons">
                <FontAwesomeIcon icon={faBook} className="floating-icon icon-1" />
                <FontAwesomeIcon icon={faGraduationCap} className="floating-icon icon-2" />
                <FontAwesomeIcon icon={faPencil} className="floating-icon icon-3" />
                <FontAwesomeIcon icon={faLightbulb} className="floating-icon icon-4" />
                <FontAwesomeIcon icon={faCalculator} className="floating-icon icon-5" />
                <FontAwesomeIcon icon={faChalkboardTeacher} className="floating-icon icon-6" />
            </div>
            <div className="hero-content">
                <h1>
                    <span className='text-bl'>Daliluka</span> — Because Every Student Deserves a Clear <important>Start</important> {/*7amra*/}
                </h1>
                <p className='meduim-text'>Born from our own struggles as university students, Dalilak is a student-made platform built to help others find what we once couldn’t .</p>
                <button className="cta-button btn-bl" onClick={()=>Navigate("../pages/AboutUs")}>Your academic journey just got easier →</button>
            </div>            
            <div className="hero-image">
                <img
                    src="src\assets\hero-image.webp"
                    alt="Students collaborating and learning together illustration"
                />
            </div>
        </section>
    )
}