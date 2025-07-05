import './Logo.css';
import logo from '../assets/logo-without-name.png';
export default function Logo() {
    return (
        <div className="logo-container">
            <img
                src={logo}
                alt="website logo"
                className="website-logo"
            />
        </div>
    )
}