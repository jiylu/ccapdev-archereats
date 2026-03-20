import { createContext, useContext } from "react";
import type { Restaurant } from "../types/restaurant";

export type RestaurantContextType = {
    restaurants: Restaurant[];
    loading: boolean;
};

export const RestaurantContext = createContext<RestaurantContextType>({
    restaurants: [],
    loading: true,
});

export const useRestaurants = () => useContext(RestaurantContext);