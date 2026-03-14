import type { Restaurant } from "../types/restaurant";
import api from "./axios";

export const getAllRestaurants = async ()  => {
    const res = await api.get<Restaurant[]>("/restaurants/getRestaurants");
    return res.data;
}

export const uploadRestaurant = async (restaurantData: Restaurant) => {
    const formData = new FormData();
    
    Object.entries(restaurantData).forEach(([key, val]) => {
        if ((key === "tags" || key === "websites") && Array.isArray(val)) {
            val.forEach((item) => formData.append(key, item));
        } 
        else if (key === "photos" && Array.isArray(val)) {
            val.forEach((file) => {
                formData.append("images", file); 
            });
        } 
        else if (key !== "images" && val !== undefined && val !== null) {
            formData.append(key, val.toString());
        }
    });

    for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }
    
    await api.post(
        "restaurants/createRestaurant",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
}