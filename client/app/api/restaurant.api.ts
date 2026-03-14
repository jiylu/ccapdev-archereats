import type { Restaurant } from "app/types/restaurant";
import api from "./axios";

export const getAllRestaurants = async ()  => {
    const res = await api.get<Restaurant[]>("/restaurants/getRestaurants");
    return res.data;
}

export const uploadRestaurant = async (formData: FormData) => {
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