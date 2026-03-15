import Navbar from "../../components/layout/navbar";
import { useEffect } from "react";

export default function OwnedRestaurants () {

    useEffect(() => {
        document.title="Owned Restaurants | ArcherEats";
    }, [])

    return (
        <div className="min-h-screen bg-[#fffcf5]">
            <Navbar />

            <section className="px-6 md:px-24 py-12">
                <h1 className="text-4xl text-center font-bold text-[#123c2f] mb-4">Your Owned Restaurants</h1>
                <hr className="border-[#123c2f]"/>

                
                
            </section>
        </div>
    )
}