import Header from '../components/Header';
import Services from '../components/Services';
import Footer from '../components/Footer';

export default function ServicesPg(){
    return (
        <div className="services-page">
            <Header />
            <Services home = {false}/>
            <Footer />
        </div>
    );
}