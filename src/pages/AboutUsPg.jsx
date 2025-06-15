import AboutUs from "../components/AboutUs";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutUsPg() {
    return (
        <div className="about-us-page">
            <Header />
            <AboutUs home={false} />
            <Footer />
        </div>
    )
}