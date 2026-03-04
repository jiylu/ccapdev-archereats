import Navbar from "../components/layout/navbar";
import { useEffect } from "react";

export default function Favorites () {
    
    useEffect(() => {
        document.title="Favorites | ArcherEats";
    }, [])

    return (
        <Navbar />
    )
}