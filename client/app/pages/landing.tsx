import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import { useEffect } from "react";

export default function Landing () {
    useEffect(() => {
        document.title="Home | ArcherEats";
    }, [])

    return (
        <div className="flex flex-col min-h-screen bg-[#fffcf5]">
            <Navbar />
        </div>
    )
}