import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import { Github } from "lucide-react";
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
                        About the Project
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

            {/* Dependencies Section */}
            <section className="max-w-5xl mx-auto px-6 pb-24">
                <h2 className="text-3xl font-extrabold text-[#123524] text-center mb-3">
                    Libraries & Dependencies
                </h2>
                <p className="text-center text-[#123524]/60 text-sm mb-10">
                    All NPM packages and third-party libraries used in this project.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Production Dependencies */}
                    <div className="bg-white border border-[#123524]/10 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#22754d]" />
                            <h3 className="text-lg font-extrabold text-[#123524]">Dependencies</h3>
                            <span className="ml-auto text-xs font-semibold text-[#22754d] bg-[#22754d]/10 px-2.5 py-1 rounded-full">
                                Production
                            </span>
                        </div>
                        <ul className="space-y-2.5">
                            {[
                                { name: "@base-ui/react", version: "^1.2.0", desc: "Unstyled, accessible UI primitives" },
                                { name: "@hookform/resolvers", version: "^5.2.2", desc: "Validation resolvers for React Hook Form" },
                                { name: "@tailwindcss/vite", version: "^4.1.18", desc: "Tailwind CSS Vite plugin" },
                                { name: "axios", version: "^1.13.6", desc: "Promise-based HTTP client" },
                                { name: "class-variance-authority", version: "^0.7.1", desc: "CSS class variance utility (CVA)" },
                                { name: "clsx", version: "^2.1.1", desc: "Conditional className utility" },
                                { name: "embla-carousel-react", version: "^8.6.0", desc: "Lightweight carousel library" },
                                { name: "framer-motion", version: "^12.38.0", desc: "Animation library for React" },
                                { name: "lucide-react", version: "^0.564.0", desc: "Icon library for React" },
                                { name: "next-themes", version: "^0.4.6", desc: "Theme management for React apps" },
                                { name: "radix-ui", version: "^1.4.3", desc: "Accessible UI component primitives" },
                                { name: "react", version: "^19.2.0", desc: "Core React library" },
                                { name: "react-dom", version: "^19.2.0", desc: "React DOM rendering" },
                                { name: "react-hook-form", version: "^7.71.2", desc: "Performant form state management" },
                                { name: "react-router-dom", version: "^7.13.0", desc: "Client-side routing for React" },
                                { name: "react-spinners", version: "^0.17.0", desc: "Loading spinner components" },
                                { name: "sonner", version: "^2.0.7", desc: "Toast notification library" },
                                { name: "tailwind-merge", version: "^3.4.0", desc: "Merge Tailwind CSS classes safely" },
                                { name: "tailwindcss", version: "^4.1.18", desc: "Utility-first CSS framework" },
                                { name: "zod", version: "^4.3.6", desc: "TypeScript-first schema validation" },
                            ].map((pkg) => (
                                <li key={pkg.name} className="flex items-start justify-between gap-3 text-sm">
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-mono font-semibold text-[#123524] truncate">{pkg.name}</span>
                                        <span className="text-[#123524]/50 text-xs leading-snug">{pkg.desc}</span>
                                    </div>
                                    <span className="shrink-0 text-xs font-medium text-[#22754d] bg-[#22754d]/10 px-2 py-0.5 rounded-md font-mono mt-0.5">
                                        {pkg.version}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Dev Dependencies */}
                    <div className="bg-white border border-[#123524]/10 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#123524]/40" />
                            <h3 className="text-lg font-extrabold text-[#123524]">Dev Dependencies</h3>
                            <span className="ml-auto text-xs font-semibold text-[#123524]/50 bg-[#123524]/10 px-2.5 py-1 rounded-full">
                                Development
                            </span>
                        </div>
                        <ul className="space-y-2.5">
                            {[
                                { name: "@eslint/js", version: "^9.39.1", desc: "ESLint JavaScript config" },
                                { name: "@types/node", version: "^24.10.13", desc: "TypeScript types for Node.js" },
                                { name: "@types/react", version: "^19.2.7", desc: "TypeScript types for React" },
                                { name: "@types/react-dom", version: "^19.2.3", desc: "TypeScript types for React DOM" },
                                { name: "@vitejs/plugin-react", version: "^5.1.1", desc: "React plugin for Vite" },
                                { name: "babel-plugin-react-compiler", version: "^1.0.0", desc: "React compiler Babel plugin" },
                                { name: "eslint", version: "^9.39.1", desc: "JavaScript/TypeScript linter" },
                                { name: "eslint-plugin-react-hooks", version: "^7.0.1", desc: "ESLint rules for React Hooks" },
                                { name: "eslint-plugin-react-refresh", version: "^0.4.24", desc: "ESLint plugin for React Refresh" },
                                { name: "globals", version: "^16.5.0", desc: "Global variables reference list" },
                                { name: "shadcn", version: "^3.8.4", desc: "Reusable component library CLI" },
                                { name: "tw-animate-css", version: "^1.4.0", desc: "Tailwind CSS animation utilities" },
                                { name: "typescript", version: "~5.9.3", desc: "Typed JavaScript superset" },
                                { name: "typescript-eslint", version: "^8.48.0", desc: "ESLint support for TypeScript" },
                                { name: "vite", version: "^7.3.1", desc: "Next-generation frontend build tool" },
                            ].map((pkg) => (
                                <li key={pkg.name} className="flex items-start justify-between gap-3 text-sm">
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-mono font-semibold text-[#123524] truncate">{pkg.name}</span>
                                        <span className="text-[#123524]/50 text-xs leading-snug">{pkg.desc}</span>
                                    </div>
                                    <span className="shrink-0 text-xs font-medium text-[#123524]/50 bg-[#123524]/5 px-2 py-0.5 rounded-md font-mono mt-0.5">
                                        {pkg.version}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}