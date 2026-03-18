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
    const [loading, setLoading] = useState(true);

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

    const pageAmt = Math.ceil(restaurants.length / 10)

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            
            {/* page container */}
            <div className="flex flex-1 mb-10">
                <Filters />
                <div className="flex w-full justify-center">
                    <div className="flex flex-col mt-4">
                        <div className="flex mb-3 justify-between items-center">
                            <span className="font-semibold">Showing {restaurants.length} of {restaurants.length} Restaurants</span>
                            <div className="flex items-center">
                                <span className="mr-2.5 whitespace-nowrap font-semibold">Sort By:</span>
                                <Select>
                                    <SelectTrigger className="w-full max-w-48">
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Filters</SelectLabel>
                                            <SelectItem value="highestRating">Sort by Highest Rating</SelectItem>
                                            <SelectItem value="mostPopular">Sort by Most Popular</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>  
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-10">
                        {restaurants.map((r) => {
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
                                    <PaginationPrevious className="cursor-pointer" />
                                </PaginationItem>

                                {Array.from({ length: pageAmt }, (_, i) => (
                                    <PaginationItem key={i}>
                                        <button
                                            className="px-3 py-1 text-sm rounded-md hover:bg-gray-200"
                                        >
                                        {i + 1}
                                        </button>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                
                                <PaginationItem>
                                    <PaginationNext className="cursor-pointer"/>
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