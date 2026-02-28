import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
        const [query, setQuery] = useState('');
        const navigate = useNavigate();

        const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if(query.trim()) navigate(`/search?q=${encodeURIComponent(query)}`)
        }
    
        return (
            <div className="flex grow items-center relative max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <form onSubmit={handleSubmit} className="flex w-full">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for Restaurants, Food.."
                        className="w-full pt-3 pr-4 pb-3 pl-10 border border-[#ddd] rounded-2xl bg-white placeholder-[#807f7f] text-sm"
                    >
                    </input>
                </form>
            </div>
        );
}