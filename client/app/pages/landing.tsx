import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import { useEffect } from "react";

export default function Landing () {
    useEffect(() => {
        document.title="Home | ArcherEats";
    }, [])

    return (
        <div className="landing-page">
            <Navbar />
            <div className="main-section">
                
            </div>
            <div className="feature-section">

            </div>
            <Footer />
        </div>
    )
}