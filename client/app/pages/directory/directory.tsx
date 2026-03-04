import RestaurantCard from "../../components/restaurant/restaurant-card";
import Navbar from "../../components/layout/navbar";
import Filters from "./filters";
import { useEffect } from "react";
import type { Restaurant } from "types/restaurant";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectItem, SelectValue } from "../../components/ui/select";


const restaurants: Restaurant[] = [
    {
        _id: "1",
        restaurantName: "The Barn",
        imgUrl: "https://static.where-e.com/Philippines/Metro_Manila/Malate/The-Barn_d37b8917af87015c57f0fe6e360d1b9d.jpg",
        avgRating: 4.9,
        amtRatings: 10,
        tags: ["Filipino","Casual Dining","Alcoholic Drinks"],
        minPrice: 1,
        maxPrice: 500,
        openingHour: "07:00AM",
        closingHour: "02:00AM",
        featuredReviews: ["The food was great!"]
    },
    {
        _id: "2",
        restaurantName: "La Toca",
        imgUrl: "https://images.summitmedia-digital.com/spotph/images/2023/10/06/la-toca-taqueria-1-1696586016.jpeg",
        avgRating: 4.6,
        amtRatings: 12,
        tags: ["Mexican","Bar","Alcoholic Drinks"],
        minPrice: 1,
        maxPrice: 500,
        openingHour: "11:00AM",
        closingHour: "02:00AM",
        featuredReviews: ["The food was great!"]
    },
    {
        _id: "3",
        restaurantName: "Tinuhog ni Benny",
        imgUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/ae/2d/6d/caption.jpg?w=1100&h=1100&s=1",
        avgRating: 4.3,
        amtRatings: 8,
        tags: ["Filipino","Casual Dining","Student Friendly"],
        minPrice: 1,
        maxPrice: 200,
        openingHour: "10:00AM",
        closingHour: "12:00AM",
        featuredReviews: ["The food was great!"]
    }
]

export default function Directory () {
    useEffect(() => {
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
                            key={r._id}
                            _id={r._id} 
                            restaurantName={r.restaurantName}
                            imgUrl={r.imgUrl}
                            avgRating={r.avgRating}
                            amtRatings={r.amtRatings}
                            tags={r.tags}
                            minPrice={r.minPrice}
                            maxPrice={r.maxPrice}
                            openingHour={r.openingHour}
                            closingHour={r.closingHour}
                            featuredReviews={r.featuredReviews}
                            />
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}