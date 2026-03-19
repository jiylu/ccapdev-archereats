import { useEffect, useState } from "react";
import type { User } from "../../types/user";
import type { Restaurant } from "../../types/restaurant";
import { getRestaurantById } from "../../api/restaurant.api";
import FavoriteRestaurantCard from "./profile-favorite-restaurant-card";
import { Heart } from "lucide-react";
import { Badge } from "../../components/ui/badge";
interface props {
    user: User
}

export default function FavoritesSection(props: props) {
    const [favoriteRestaurants, setRestaurants] = useState<Restaurant[]>([]);
    
    useEffect(() => {
        const fetchFavoriteRestaurants = async () => {
            const restaurantData = []

            for (const r of props.user.favoriteRestaurants) {
                const restaurant = await getRestaurantById(r)
                restaurantData.push(restaurant)
            }

            setRestaurants(restaurantData);
        }

        fetchFavoriteRestaurants();
    }, [props.user.favoriteRestaurants])

    return (
        <div className="flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-5">
                <h1 className="text-2xl font-bold text-[#123524] tracking-tight">Favorites</h1>
                <Badge className="text-xs font-semibold text-emerald-700 bg-emerald-50">
                    {favoriteRestaurants.length}
                </Badge>
            </div>

            {favoriteRestaurants.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
                    <Heart size={32} className="mb-2 opacity-40" />
                    <p className="text-sm">No favorites yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-3 items-start">
                    {favoriteRestaurants.map((r) => {
                        const imgUrls = r.images.filter((img): img is string => typeof img === "string");
                        console.log(r._id)
                        return (
                            <FavoriteRestaurantCard
                                imgUrl={imgUrls[0]}
                                restaurantId={r._id}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    )
}