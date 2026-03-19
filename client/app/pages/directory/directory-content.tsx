import RestaurantCard from "../../components/restaurant/restaurant-card";
import type { Restaurant } from "../../types/restaurant";

interface DirectoryContentProps {
    restaurants: Restaurant[];
}

export default function DirectoryContent (props: DirectoryContentProps) {
    return (
            <div className="grid grid-cols-2 gap-3 mb-10">
            {props.restaurants.map((r) => {
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
    )
}