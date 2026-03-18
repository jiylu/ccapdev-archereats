import { useRef} from "react";
import { Link } from "react-router-dom"; 

export default function Footer(){

    const topRef = useRef<HTMLDivElement>(null);
    const scrollToTop = () => {
        topRef.current?.scrollIntoView({behavior: "smooth"});
    }

    return (
        <footer ref={topRef} className="relative overflow-hidden  text-white py-20 px-15 font-['Roboto',sans-serif]" style={{background: "linear-gradient(to right, #1a1a1a, #111)"}}>
            
                <div className="absolute -bottom-6.25 -right-px flex items-center opacity-[0.08] z-0 pointer-events-none">
                    <img src="../../public/archer-eats-logo.png" alt="ArcherEats Logo" className="h-55 w-auto" />
                    <span style={{ fontFamily: '"League Spartan", sans-serif' }} className="text-[190px] font-extrabold text-white translate-y-8.75 tracking-[-0.03em] leading-[0.8]">rcherEats.</span>
                </div>
            

            <div className="relative z-2 max-w-300 mx-auto flex justify-between items-start gap-15 flex-wrap">
                <div className="max-w-100">
                    <div className="flex items-center font-['League_Spartan',sans-serif] text-[47px] font-bold text-white no-underline self-start transition-colors duration-300">
                        <img src="../../public/archer-eats-logo.png" alt="ArcherEats Logo" className="h-11.75 w-auto -translate-x-[2.5px] -translate-y-2.5 pr-0"/>
                        <span>rcherEats</span>
                    </div>
                    <p className="mb-4">Discover Taft Avenue's treats at your fingertips.</p>
                    <button onClick={scrollToTop} className="inline-flex items-center gap-2.5 px-5.5 py-3 border-2 border-white rounded-lg bg-transparent text-white text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-white hover:text-black">
                        Back to Top
                    </button>
                </div>
                <div className="flex flex-col gap-5.5 text-[18px]">
                    <Link to="/" className="text-white no-underline transition-opacity duration-300 hover:opacity-70">Home</Link>
                    <Link to="/" className="text-white no-underline transition-opacity duration-300 hover:opacity-70">Github</Link>
                    <Link to="/" className="text-white no-underline transition-opacity duration-300 hover:opacity-70">Contact Us</Link>
                </div>

                <div className="flex flex-col gap-5.5 text-[18px]">
                    <Link to="/" className="text-white no-underline transition-opacity duration-300 hover:opacity-70">Privacy Policy</Link>
                    <Link to="/" className="text-white no-underline transition-opacity duration-300 hover:opacity-70">Cookie Policy</Link>
                </div>
            </div>
        </footer>
    )
}