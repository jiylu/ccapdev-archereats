import { motion } from "framer-motion";
import Searchbar from "../../components/layout/searchbar";

export default function HeroSection () {
    return (
         <section className="relative h-[600px] overflow-hidden">
            <motion.img
                src="/building-noborder.jpeg"
                alt="Building"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/50" />
            <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 lg:px-24">
                <motion.h1
                    style={{ fontFamily: "Roboto, sans-serif", color: "beige" }}
                    className="font-extrabold text-3xl md:text-5xl leading-tight max-w-xl drop-shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                >
                    Discover and Experience DLSU's Diners through ArcherEats
                </motion.h1>

                <motion.div
                    className="mt-6 w-full max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                >
                    <Searchbar variant="hero" />
                </motion.div>
                
                <motion.p
                    className="font-['Roboto',sans-serif] mt-[20px] text-[12px] text-[#eeeeee] pt-[180px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    St. La Salle Hall <br />
                    nobodycallsmeclarke on Instagram
                </motion.p>
            </div>
        </section>
    )
}