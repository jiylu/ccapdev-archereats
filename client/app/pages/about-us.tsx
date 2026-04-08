import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import { Github, Instagram, Facebook } from "lucide-react";
import { useEffect } from "react";

const teamMembers = [
    {
        name: "Jeremy Leano",
        role: "Full Stack Developer",
        avatar: "/leano-pic.jpeg",
        github: "https://github.com/jiylu",
    },
    {
        name: "Gaibril Kyle Gregorio",
        role: "Full Stack Developer",
        avatar: "/gregorio-pic.jpeg",
        github: "https://github.com/gbrlgrg",
    },
    {
        name: "Michael Maglente",
        role: "Frontend Developer & Quality Assurance",
        avatar: "/maglente-pic.jpg",
        github: "https://github.com/Michael-Maglente",
    },
    {
        name: "Diego Mejia",
        role: "Frontend Developer & Quality Assurance",
        avatar: "/mejia-pic.jpg",
        github: "https://github.com/LaSalsaEsDeliciosa",
    },
];

export default function AboutUs() {

    useEffect(() => {
        document.title="About Us | ArcherEats";
    }, [])
    return (
        <div className="min-h-screen bg-[#fffcf5]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 overflow-hidden">
                {/* Decorative background blob */}
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#22754d]/10 rounded-full blur-3xl pointer-events-none" />

                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#22754d] bg-[#22754d]/10 px-4 py-1.5 rounded-full mb-5">
                    CCAPDEV Project
                </span>

                <h1 className="text-5xl font-extrabold text-[#123524] leading-tight max-w-2xl">
                    Meet the team behind{" "}
                    <span className="text-[#22754d] italic">RatatouillEats</span>
                </h1>

                <p className="mt-5 text-[#123524]/70 text-lg max-w-xl leading-relaxed">
                    We're <span className="font-semibold text-[#123524]">Ratatouilleats</span> — a group of four passionate developers and
                    designers who built this platform to help students, workers, and food lovers
                    discover and review the best eats around campus.
                </p>

                {/* Divider accent */}
                <div className="mt-10 flex items-center gap-3">
                    <div className="h-px w-16 bg-[#22754d]/30 rounded-full" />
                    <div className="h-2 w-2 rounded-full bg-[#22754d]" />
                    <div className="h-px w-16 bg-[#22754d]/30 rounded-full" />
                </div>
            </section>

            {/* About the Project */}
            <section className="max-w-3xl mx-auto px-6 pb-16 text-center">
                <div className="bg-white border border-[#123524]/10 rounded-2xl p-8 shadow-sm">
                    <h2 className="text-2xl font-extrabold text-[#123524] mb-3">
                        🍽️ About the Project
                    </h2>
                    <p className="text-[#123524]/70 leading-relaxed text-base">
                        ArcherEats is a food establishment review platform built for our <span className="font-semibold text-[#123524]">CCAPDEV</span> course project.
                        Our goal is to give students and workers around Taft Avenue a trusted space to discover, rate, and review
                        restaurants and food stalls — making every meal decision a little easier and a lot more delicious.
                    </p>
                </div>
            </section>

            {/* Team Section */}
            <section className="max-w-5xl mx-auto px-6 pb-24">
                <h2 className="text-3xl font-extrabold text-[#123524] text-center mb-12">
                    Our Team
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member, idx) => (
                        <div
                            key={idx}
                            className="group bg-white border border-[#123524]/10 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                        >
                            {/* Avatar */}
                            <div className="relative mb-4">
                                <div className="w-24 h-24 rounded-full ring-4 ring-[#22754d]/20 overflow-hidden bg-[#fffcf5]">
                                    <img
                                        src={member.avatar}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Green dot accent */}
                                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-[#22754d] rounded-full border-2 border-white" />
                            </div>

                            {/* Name & Role */}
                            <h3 className="font-bold text-[#123524] text-base leading-snug">{member.name}</h3>
                            <p className="text-sm text-[#22754d] font-medium mt-0.5 mb-4">{member.role}</p>

                            {/* Divider */}
                            <div className="w-10 h-px bg-[#22754d]/20 mb-4" />

                            {/* Social Links */}
                            <div className="flex gap-3">
                                <a
                                    href={member.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#123524]/5 text-[#123524]/60 hover:bg-[#123524] hover:text-white transition-all duration-150"
                                    aria-label="GitHub"
                                >
                                    <Github className="w-4 h-4" />
                                    <span className="text-xs font-medium">GitHub</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}