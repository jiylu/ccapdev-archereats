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
        else if (key === "images" && Array.isArray(val)) {
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

export const getOwnedRestaurants = async () => {
    const res = await api.get<Restaurant[]>("/restaurants/ownedRestaurants", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    return res.data;
};

export const updateRestaurant = async (id: string, restaurantData: Restaurant) => {
    const formData = new FormData();

    Object.entries(restaurantData).forEach(([key, val]) => {
        if (key === "tags" && Array.isArray(val)) {
            val.forEach((item) => formData.append("tags", item));
        } else if (key === "websites" && Array.isArray(val)) {
            val.forEach((item) => formData.append("websites", item));
        } else if (key === "images" && Array.isArray(val)) {
            val.forEach((item) => {
                if (item instanceof File) {
                    formData.append("images", item);
                } else if (typeof item === "string") {
                    formData.append("existingImages", item);
                }
            });
        } else if (key !== "images" && val !== undefined && val !== null) {
            formData.append(key, val.toString());
        }
    });

    const res = await api.put(`/restaurants/updateRestaurant/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    return res.data;
};

export const getRestaurantById = async (id: string) => {
    const res = await api.get<Restaurant>(`/restaurants/${id}`);
    return res.data;
};