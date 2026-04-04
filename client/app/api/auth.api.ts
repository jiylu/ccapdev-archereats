import type { User } from "app/types/user";
import api from "./axios";

export const loginUser = async (authData: { login: string; password: string })  => {
    const { data } = await api.post<{ user: User}>("/auth", authData, {
        withCredentials: true
    })
    return data;
}

export const resetPassword = async (authData: { login: string; password: string }) => {
    const { data } = await api.post("/users/reset-password", authData);
    return data;
};

export const checkLoginExists = async (login: string) => {
    const { data } = await api.get<{ exists: boolean }>("/users/check-login", {
        params: { login }
    });
    return data;
};