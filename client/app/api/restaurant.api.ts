import type { Restaurant } from "app/types/restaurant";
import api from "./axios";

export const getAllRestaurants = async ()  => {
    const res = await api.get<Restaurant[]>("/restaurants/getRestaurants");
    console.log("API response:", res.data); 
    return res.data;
}