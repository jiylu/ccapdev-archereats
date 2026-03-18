import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import Searchbar from "../components/layout/searchbar";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef} from "react";
import { url } from "zod";



export default function Landing () {
    
    return (
        <>
        <Navbar />
            <main>
                {/** Main Section Here */}
                <section className="relative h-[540px] overflow-hidden">
                    {/**Background Image Here */}
                    <img src="/building.jpeg" alt="Building" className="absolute inset-0 w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

                    <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 lg:px-24">
                        <h1 style={{ fontFamily: "Roboto, sans-serif" }} className="text-white font-extrabold text-3xl md:text-5xl leading-tight max-w-xl drop-shadow-lg">
                            Discover and Experience DLSU's Diners through ArcherEats 
                        </h1>
                        <p className="font-['Roboto',sans-serif] mt-[20px] text-[12px] text-[#eeeeee] pt-[180px]">
                            Building <br />
                            nobodycallsmeclarke on Instagram
                        </p>
                    </div>
                </section>

                {/* Feature Section Here*/}
                <section className="bg-[#f5f0e8] px-8 md:px-16 py-10">
                <div className="flex items-center justify-between mb-6">
                    <div>
                    <div className="w-16 h-[3px] bg-gray-800 mb-3" />
                    <h2 className="text-2xl font-bold text-gray-900">
                        Featured Eateries around Taft
                    </h2>
                    </div>
                    <a
                    href="#"
                    className="text-sm text-gray-600 underline underline-offset-2 hover:text-gray-900 transition-colors"
                    >
                    See All
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {/* {eateries.map((eatery) => (
                    // Swap this div with your <EateryCard key={eatery.id} {...eatery} />
                    <div key={eatery.id} className="bg-white rounded-xl shadow-sm h-64" />
                    ))} */}
                </div>
                </section>
            </main>
        <Footer />
        </>
    )
}