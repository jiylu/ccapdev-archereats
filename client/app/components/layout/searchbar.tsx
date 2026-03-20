import { useRestaurants } from "../../hooks/useRestaurants";
import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface SearchbarProps {
    variant?: "default" | "hero"
}

export default function Searchbar({ variant = "default" }: SearchbarProps) {
    const [query, setQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();
    const { restaurants } = useRestaurants();

    const suggestions = query.trim()
        ? restaurants
            .filter(r => r.restaurantName.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5)
        : [];

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/directory?q=${encodeURIComponent(query)}`);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setShowSuggestions(true);
    };

    const handleSelect = (name: string) => {
        setQuery(name);
        setShowSuggestions(false);
        navigate(`/directory?q=${encodeURIComponent(name)}`);
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

            <form onSubmit={handleSubmit}className="flex w-full">
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    placeholder="Search for Restaurants"
                    className={`w-full border border-[#ddd] rounded-2xl bg-white placeholder-[#807f7f] transition-all ${
                        isHero
                            ? "py-4 pl-12 pr-5 text-base shadow-sm focus:ring-2 focus:ring-green-600"
                            : "py-3 pl-10 pr-4 text-sm"
                    }`}
                />
            </form>

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    {suggestions.map((r) => (
                        <button
                            key={r._id}
                            onMouseDown={() => handleSelect(r.restaurantName)}
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                            <Search size={13} className="text-gray-400" />
                            {r.restaurantName}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}