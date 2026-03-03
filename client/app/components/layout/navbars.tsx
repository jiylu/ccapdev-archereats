import { Link } from "react-router-dom";
import Searchbar from "./searchbar";
import { LoginModal } from "../auth/login-modal";
import MenuButton from "./menu-button";

export default function Navbar () {
    
    return (
        <nav className="sticky top-0 z-50 bg-[rgba(18,53,36,1)] py-2 px-20 shadow-md">
            <div className="flex justify-between items-center max-w-7xl m-auto">
                <Link to='/' className="flex align-baseline shrink-0 gap-0.5 mt-2.5 transition-transform duration-300 ease-in-out hover:-translate-y-1 cursor-pointer">
                    <img src="/archer-eats-logo.png" className="h-8 w-auto" />
                    <span style={{ fontFamily: '"League Spartan", sans-serif' }} className="text-[32px] font-bold text-white">rcherEats.</span>
                </Link>
                <Searchbar></Searchbar>
                <div className="flex items-center gap-6 shrink-0 text-white text-[1.15rem] font-medium">
                    <Link to='/directory'>Directory</Link>
                    <LoginModal />
                    <MenuButton />
                </div>
            </div>
        </nav>
    );
}