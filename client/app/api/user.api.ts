import type { User } from "app/types/user";
import api from "./axios";

export const registerUser = async (userData: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    isStudent: boolean;
}): Promise<User> => {
    const res = await api.post<User>("/users/createUser", userData)
    return res.data 
}

export const fetchUser = async (userId: string): Promise<User> => {
    const res = await api.get(`/users/${userId}`);
    return res.data;
}

export const favoriteRestaurant = async (userId: string, restaurantId: string): Promise<User>  => {
    const res = await api.post(`/users/${userId}/favorites/${restaurantId}`)
    return res.data;
}

export const unfavoriteRestaurant = async (userId: string, restaurantId: string): Promise<User> => {
    const res = await api.patch(`/users/${userId}/favorites/${restaurantId}`)
    return res.data;
}

export const updateUser = async (userId: string, formData: FormData): Promise<User> => {
    const res = await api.patch<User>(`/users/${userId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

export const checkUsernameAvailability = async (username: string): Promise<{ isAvailable: boolean }> => {
    const res = await api.get("/users/check-username", {
        params: { username }
    });
    return res.data;
};
 
