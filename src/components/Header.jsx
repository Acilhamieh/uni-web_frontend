import './Header.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={`${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="logo-name-container">
                <div className="logo-container">
                    <img
                        src="src\assets\logo-without-name.png"
                        alt="website logo"
                        className="website-logo"
                    />
                </div>
                <h3 className='small-heading website-name'>Daliluka</h3>
            </div>
            
            <div className="nav-auth-container">
                <nav className={isMenuOpen ? 'open' : ''}>
                    <ul className='links-container'>
                        <li className='link-container'>
                            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        </li>
                        <li className='link-container'>
                            <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
                        </li>
                        <li className='link-container'>
                            <Link to="/aboutus" onClick={() => setIsMenuOpen(false)}>About us</Link>
                        </li>
                        <li className='link-container'>
                            <Link to="/contactus" onClick={() => setIsMenuOpen(false)}>Contact us</Link>
                        </li>
                        <li className='link-container'>
                            <Link to="/news" onClick={() => setIsMenuOpen(false)}>News & Events</Link>
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