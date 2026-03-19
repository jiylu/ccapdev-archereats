import Navbar from "../../components/layout/navbar";
import Filters from "./filters";
import { useEffect, useState } from "react";
import type { Restaurant } from "app/types/restaurant";
import { getAllRestaurants } from "../../api/restaurant.api";
import PageLoader from "../../components/ui/loading";
import Footer from "../../components/layout/footer";
import PaginationControls from "./pagination-controls";
import DirectoryContent from "./directory-content";
import DirectoryHeader from "./directory-header";

export default function Directory () {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState<string>("");
    const [filters, setFilters] = useState({
        priceRange: [] as string[],
        minRating: 0,
        cuisines: [] as string[],
        food: [] as string[],
        tags: [] as string[], 
    })
    

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const [data] = await Promise.all([
                    getAllRestaurants(),
                ]);

                setRestaurants(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false)
            }
        }

        fetchRestaurants();
    }, [])
    
	useEffect(() => {
		document.title="Directory | ArcherEats";		
    })
    
    if (loading) return <PageLoader />;

    const getPriceCategory = (price: number) => {
        if (price <= 200) return "₱";
        if (price <= 500) return "₱₱";
        return "₱₱₱";
    };

    const filteredRestaurants = restaurants.filter((r) => {
        const selectedTags = [
            ...filters.cuisines,
            ...filters.food,
            ...filters.tags
        ]
        
        if ((r.avgRating ?? 0) < filters.minRating) {
            return false;
        }  

        if (
            selectedTags.length > 0 && 
            !selectedTags.some(tag => r.tags.includes(tag))
        ) {
            return false;
        }

        if (filters.priceRange.length > 0) {
            const category = getPriceCategory(r.maxPrice);

            if (!filters.priceRange.includes(category)) {
                return false;
            }
        }

        return true;
    })

    const sortedRestaurants = [...filteredRestaurants].sort((a,b) => {
        if (sortOption === "highestRating") {
            return (b.avgRating ?? 0) - (a.avgRating ?? 0);
        }

        if (sortOption === "mostPopular") {
            return (b.amtRatings ?? 0) - (a.amtRatings ?? 0);
        }

        if (sortOption === "none") {
            return 0;
        }

        return 0;
    })

    const itemsPerPage = 6;
    const pageAmt = Math.ceil(filteredRestaurants.length / itemsPerPage);
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentRestaurants = sortedRestaurants.slice(start, end);

    // max sa pagination

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            
            {/* page container */}
            <div className="flex flex-1 mb-10">
                <Filters 
                    filters={filters}
                    setFilters={setFilters}
                    onPageChange={setCurrentPage}
                />

                <div className="flex w-full justify-center">
                    <div className="flex flex-col mt-4 w-full max-w-5xl"> 
                        <DirectoryHeader 
                            currentPage={currentPage}
                            pageAmt={pageAmt}
                            setSortOption={(value) => setSortOption(value)}
                        />
                        
                        <DirectoryContent 
                            restaurants={currentRestaurants}
                        />

                        <PaginationControls 
                            currentPage={currentPage}
                            pageAmt={pageAmt}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}