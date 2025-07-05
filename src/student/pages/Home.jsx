import Header from '../components/Header';
import HeroSection from '../components/HeroSection'
;import Services from './Services';
import AboutUs from './AboutUs';
import Footer from '../components/Footer';


export default function Home() {
    return (
        <div className="home-page">
            <HeroSection />
            <Services home = {true}/>
            <AboutUs home = {true} />  
        </div>
    );
}
