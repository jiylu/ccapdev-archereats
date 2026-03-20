import { useState, useEffect } from "react";
import type { Restaurant } from "../types/restaurant";
import { getAllRestaurants } from "../api/restaurant.api";
import { RestaurantContext } from "../hooks/useRestaurants";

export function RestaurantProvider({ children }: { children: React.ReactNode }) {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllRestaurants()
            .then(setRestaurants)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <RestaurantContext.Provider value={{ restaurants, loading }}>
            {children}
        </RestaurantContext.Provider>
    );
}