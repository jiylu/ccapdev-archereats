import RestaurantCard from "../../components/restaurant/restaurant-card";
import Navbar from "../../components/layout/navbar";
import Filters from "./filters";
import { useEffect, useState } from "react";
import type { Restaurant } from "app/types/restaurant";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectItem, SelectValue } from "../../components/ui/select";
import { getAllRestaurants } from "../../api/restaurant.api";


// const restaurants: Restaurant[] = [
//     {
//         _id: "1",
//         restaurantName: "The Barn",
//         address: "HX9R+2RQ, Fidel A.Reyes, Malate, Manila, 1004 Metro Manila",
//         googleMapsLink: "https://maps.app.goo.gl/TxofVpwW2uETwZyT8",
//         imgUrl: "https://static.where-e.com/Philippines/Metro_Manila/Malate/The-Barn_d37b8917af87015c57f0fe6e360d1b9d.jpg",
//         avgRating: 4.9,
//         amtRatings: 10,
//         tags: ["Filipino","Casual Dining","Alcoholic Drinks"],
//         minPrice: 1,
//         maxPrice: 500,
//         openingHour: "07:00AM",
//         closingHour: "02:00AM",
//     },
//     {
//         _id: "2",
//         restaurantName: "La Toca",
//         address: "2223 Fidel A.Reyes, Malate, Manila, 1004 Metro Manila",
//         googleMapsLink: "https://maps.app.goo.gl/Vr742BEvbYn5GdjL6",
//         imgUrl: "https://images.summitmedia-digital.com/spotph/images/2023/10/06/la-toca-taqueria-1-1696586016.jpeg",
//         avgRating: 4.6,
//         amtRatings: 12,
//         tags: ["Mexican","Bar","Alcoholic Drinks"],
//         minPrice: 1,
//         maxPrice: 500,
//         openingHour: "11:00AM",
//         closingHour: "02:00AM",
//     },
//     {
//         _id: "3",
//         restaurantName: "Tinuhog ni Benny",
//         address: "879 Dagonoy St, Malate, Manila, 1004 Metro Manila",
//         googleMapsLink: "https://maps.app.goo.gl/GHSfo8vmb9QhsSZL7",
//         imgUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/ae/2d/6d/caption.jpg?w=1100&h=1100&s=1",
//         avgRating: 4.3,
//         amtRatings: 8,
//         tags: ["Filipino","Casual Dining","Student Friendly"],
//         minPrice: 1,
//         maxPrice: 200,
//         openingHour: "10:00AM",
//         closingHour: "12:00AM",
//     }
// ]

export default function Directory () {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const data = await getAllRestaurants();
                setRestaurants(data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchRestaurants();
        document.title="Directory | ArcherEats";
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            
            {/* page container */}
            <div className="flex flex-1">
                <Filters />
                <div className="flex w-full justify-center">
                    <div className="flex flex-col mt-4">
                        <div className="flex mb-3 justify-between items-center">
                            <span className="font-semibold">Showing {restaurants.length} Restaurants</span>
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

                        <div className="grid grid-cols-2 gap-3">
                        {restaurants.map((r) => (
                            <RestaurantCard 
                                key={r._id || r.restaurantName}
                                _id={r._id || "unknown"} 
                                restaurantName={r.restaurantName}
                                imageUrl={r.images[0]}
                                avgRating={r.avgRating}
                                amtRatings={r.amtRatings}
                                tags={r.tags}
                                minPrice={r.minPrice}
                                maxPrice={r.maxPrice}
                                openingHour={r.openingHour}
                                closingHour={r.closingHour}
                            />
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}