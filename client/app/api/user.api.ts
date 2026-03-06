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