import { Link } from "react-router-dom";
import Navbar from "../components/layout/navbar";

export default function Landing () {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="text-center max-w-2xl mb-12">
                    <h1 className="text-5xl font-extrabold text-[#006937] mb-4">Discover the Best Eats Around</h1>
                    <p className="text-lg text-gray-600">Explore local favorites, read real reviews, and find your next go-to spot.</p>
                </div>
                
                <section className="w-full max-w-4xl">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Review</h2>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row">
                            <img 
                                src="https://thebarnbyborro.com/cdn/shop/files/The-Barn-by-Borro-Interior.jpg?v=1732560579&width=3840" 
                                alt="The Barn by Borro" 
                                className="w-full md:w-1/2 object-cover h-64 md:h-auto"
                            />
                            <div className="p-8 flex flex-col justify-center">
                                <h3 className="text-3xl font-bold text-gray-900 mb-2">The Barn by Borro</h3>
                                <p className="text-gray-600 mb-6 line-clamp-3">
                                    Situated in Manila, within a few steps of De La Salle University - Manila. A rustic yet modern dining experience perfect for students and foodies alike.
                                </p>
                                
                                <Link 
                                    to="/review/barn" 
                                    className="bg-[#006937] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1E4D36] transition-colors w-fit shadow-sm"
                                >
                                    View Full Review & Menu
                                </Link>
                                
                                <Link to="/directory" className="mt-4 text-emerald-700 hover:underline font-medium text-sm">
                                    Browse all restaurants →
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}