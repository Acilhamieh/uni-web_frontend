import Header from '../components/Header';
import HeroSection from '../components/HeroSection'
;import Services from '../components/Services';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';

import './Home.css';
export default function Home() {
    return (
        <div className="home-page">
            <Header />
            <HeroSection />
            <Services />
            <AboutUs details = {false} />  
            <Footer />  
        </div>
    );
}
