import RestaurantCard from "../../components/restaurant/restaurant-card";
import Navbar from "../../components/layout/navbar";
import Filters from "./filters";
import { useEffect, useState } from "react";
import type { Restaurant } from "app/types/restaurant";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectItem, SelectValue } from "../../components/ui/select";
import { getAllRestaurants } from "../../api/restaurant.api";
import PageLoader from "../../components/ui/loading";
import Footer from "../../components/layout/footer";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNext, PaginationPrevious } from "../../components/ui/pagination";

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
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = startPage + maxVisible - 1;

    if (endPage > pageAmt) {
        endPage = pageAmt;
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    const handleNextPage = () => {
        if (currentPage == pageAmt) return;

        setCurrentPage(currentPage+1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const handlePreviousPage = () => {
        if (currentPage == 1) return;

        setCurrentPage(currentPage-1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }


    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            
            {/* page container */}
            <div className="flex flex-1 mb-10">
                <Filters 
                    filters={filters}
                    setFilters={setFilters}
                />

                <div className="flex w-full justify-center">
                    <div className="flex flex-col mt-4">
                        <div className="flex mb-3 justify-between items-center">
                            <span className="font-semibold">Showing {currentPage} of {pageAmt} page(s)</span>
                            <div className="flex items-center">
                                <span className="mr-2.5 whitespace-nowrap font-semibold">Sort By:</span>
                                <Select onValueChange={(value) => setSortOption(value)}>
                                    <SelectTrigger className="w-full max-w-48">
                                        <SelectValue placeholder="None" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Filters</SelectLabel>
                                            <SelectItem value="highestRating">Sort by Highest Rating</SelectItem>
                                            <SelectItem value="mostPopular">Sort by Most Popular</SelectItem>
                                            <SelectItem value="none">None</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>  
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-10">
                        {currentRestaurants.map((r) => {
                            const imgUrls = r.images.filter((img): img is string => typeof img === "string");

                            return (
                                <RestaurantCard
                                    key={r._id || r.restaurantName}
                                    _id={r._id || "unknown"}
                                    restaurantOwner={r.owner || "unknown"}
                                    restaurantName={r.restaurantName}
                                    imageUrl={imgUrls[0]} 
                                    avgRating={r.avgRating || 0}
                                    amtRatings={r.amtRatings || 0}
                                    tags={r.tags}
                                    minPrice={r.minPrice}
                                    maxPrice={r.maxPrice}
                                    openingHour={r.openingHour}
                                    closingHour={r.closingHour}
                                />
                            );
                        })}
                        </div>

                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        size={30}
                                        className="cursor-pointer" 
                                        onClick={() => handlePreviousPage()}
                                    />
                                </PaginationItem>
                                    {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                                        const page = startPage + i;

                                        return (
                                            <PaginationItem 
                                                key={page} 
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-3 py-1 text-sm rounded-md ${
                                                        currentPage === page
                                                            ? "bg-emerald-600 text-white"
                                                            : "hover:bg-gray-200"
                                                }`}
                                            >
                                                {page}
                                            </PaginationItem>
                                        );
                                    })}

                                {endPage < pageAmt && (
                                    <>
                                        {endPage < pageAmt - 1 && (
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        )}

                                        <PaginationItem 
                                            key={pageAmt} 
                                            onClick={() => setCurrentPage(pageAmt)}
                                            className={`px-3 py-1 text-sm rounded-md ${
                                                    currentPage === pageAmt
                                                        ? "bg-emerald-600 text-white"
                                                        : "hover:bg-gray-200"
                                            }`}
                                        >
                                            {pageAmt}
                                        </PaginationItem>
                                    </>
                                )}
                                
                                <PaginationItem>
                                    <PaginationNext 
                                        size={30}
                                        className="cursor-pointer"
                                        onClick={() => handleNextPage()}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>


            </div>

            <Footer />
        </div>
    )
}