import { Link } from "react-router-dom";
import { ArrowUp, Github } from "lucide-react";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer
            className="relative overflow-hidden text-white font-['Roboto',sans-serif]"
            style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #0e0e0e 100%)" }}
        >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="absolute -bottom-4 -right-px flex items-center opacity-[0.05] z-0 pointer-events-none select-none">
                <img src="/archer-eats-logo.png" alt="" className="h-36 w-auto" />
                <span
                    style={{ fontFamily: '"League Spartan", sans-serif' }}
                    className="text-[120px] font-extrabold text-white translate-y-6 tracking-[-0.03em] leading-[0.8]"
                >
                    rcherEats.
                </span>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-8 py-10">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    
                    <div className="flex flex-col gap-2">
                        <Link
                            to="/"
                            className="flex items-center gap-1 no-underline group"
                            style={{ fontFamily: '"League Spartan", sans-serif' }}
                        >
                            <img
                                src="/archer-eats-logo.png"
                                alt="ArcherEats Logo"
                                className="h-8 w-auto -translate-y-1 transition-transform duration-300 group-hover:scale-110"
                            />
                            <span className="text-[28px] font-bold text-white leading-none transition-opacity duration-300 group-hover:opacity-80">
                                rcherEats
                            </span>
                        </Link>
                        <p className="text-white/50 text-sm leading-relaxed max-w-[220px]">
                            Discover Taft Avenue's treats at your fingertips.
                        </p>
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 bg-white/5 text-white/70 text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
                    >
                        <ArrowUp
                            size={14}
                            strokeWidth={2.5}
                            className="transition-transform duration-300 group-hover:-translate-y-0.5"
                        />
                        Back to top
                    </button>
                </div>

                <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    
                    <div className="flex items-center gap-6 text-sm">
                        <Link
                            to="/"
                            className="text-white/60 no-underline transition-colors duration-200 hover:text-white"
                        >
                            Home
                        </Link>
                        <span className="text-white/20">|</span>
                        <a
                            href="https://github.com/jiylu/ccapdev-archereats"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/60 no-underline transition-colors duration-200 hover:text-white flex items-center gap-1.5"
                        >
                            <Github size={15} />
                            <span>GitHub</span>
                        </a>
                    </div>

                    <div className="text-xs text-white/30 flex items-center gap-2">
                        <span>© {new Date().getFullYear()} ArcherEats</span>
                        <span className="text-white/20">•</span>
                        <span>Made for Taft Ave</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}