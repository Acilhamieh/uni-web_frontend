import './Header.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Logo from './Logo';

const SERVICES = [
    { name: 'Past Exams & Solutions', path: 'sessions' },
    { name: 'Final Student Projects', path: 'projects' },
    { name: 'Internship Opportunities', path: 'trainees' },
    { name: 'About Business Informatics', path: 'aboutmajor' },
    { name: 'Courses Offered', path: 'courses' },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const servicesRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 50);
        };

        const handleClickOutside = (event) => {
            if (servicesRef.current && !servicesRef.current.contains(event.target)) {
                setIsServicesOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleServicesClick = (e) => {
        e.preventDefault();
        setIsServicesOpen(!isServicesOpen);
    };

    return (
        <header className={`${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="logo-name-container">
                <Logo/>
                <h3 className='small-heading website-name'>Daliluka</h3>
            </div>
            
            <div className="nav-auth-container">
                <nav className={isMenuOpen ? 'open' : ''}>
                    <ul className='links-container'>
                        <li className='link-container'>
                            <Link to="home" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        </li>
                        <li className='link-container services-container' ref={servicesRef}>
                            <Link to="#" onClick={handleServicesClick}>
                                Services
                                <span className={`services-arrow ${isServicesOpen ? 'open' : ''}`}>▼</span>
                            </Link>
                            {isServicesOpen && (
                                <ul className="services-dropdown">
                                    {SERVICES.map((service) => (
                                        <li key={service.path}>
                                            <Link 
                                                to={service.path}
                                                onClick={() => {
                                                    setIsServicesOpen(false);
                                                    setIsMenuOpen(false);
                                                }}
                                            >
                                                {service.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <li className='link-container'>
                            <Link to="aboutus" onClick={() => setIsMenuOpen(false)}>About us</Link>
                        </li>
                        <li className='link-container'>
                            <Link to="contactus" onClick={() => setIsMenuOpen(false)}>Contact us</Link>
                        </li>
                        <li className='link-container'>
                            <Link to="news" onClick={() => setIsMenuOpen(false)}>News & Events</Link>
                        </li>
                    </ul>
                </nav>

                {/* Desktop auth buttons */}
                <div className="desktop-auth">
                    <Link to="/login" className="login-btn">Login</Link>
                    <Link to="/signup" className="signup-btn">Sign Up</Link>
                </div>

                {/* Mobile auth buttons */}
                <div className="mobile-auth-container">
                    <Link to="/login" className="mobile-btn" onClick={() => setIsMenuOpen(false)}>Login</Link>
                    <Link to="/signup" className="mobile-btn" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                </div>

                <button className="hamburger" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
}