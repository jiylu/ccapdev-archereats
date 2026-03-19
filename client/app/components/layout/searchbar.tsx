import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface SearchbarProps {
    variant?: "default" | "hero"
}

export default function Searchbar({ variant = "default" }: SearchbarProps) {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim()) navigate(`/search?q=${encodeURIComponent(query)}`);
    };

    const isHero = variant === "hero";

    return (
        <div
            className={`flex items-center relative ${
                isHero ? "w-full max-w-3xl" : "grow max-w-lg"
            }`}
        >
            <Search
                className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${
                    isHero ? "left-5 w-6 h-6" : "left-3 w-5 h-5"
                }`}
            />

            <form onSubmit={handleSubmit} className="flex w-full">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for Restaurants, Food.."
                    className={`w-full border border-[#ddd] rounded-2xl bg-white placeholder-[#807f7f] transition-all ${
                        isHero
                            ? "py-4 pl-12 pr-5 text-base shadow-sm focus:ring-2 focus:ring-green-600"
                            : "py-3 pl-10 pr-4 text-sm"
                    }`}
                />
            </form>
        </div>
    );
}