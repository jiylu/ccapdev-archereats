import type { User } from "app/types/user";
import api from "./axios";

export const loginUser = async (authData: { login: string; password: string })  => {
    const { data } = await api.post<{ user: User; token: string}>("/auth", authData)
    return data;
}