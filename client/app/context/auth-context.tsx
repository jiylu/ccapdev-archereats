import { useState } from "react";
import type { ReactNode } from "react"; 
import type { User } from "../types/user";
import { AuthContext } from "../hooks/useAuth";


interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [user, setUser] = useState<User | null>(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    const setAuth = (newToken: string | null, newUser?: User | null) => {
        if (newToken) localStorage.setItem("token", newToken);
        else localStorage.removeItem("token");
        setToken(newToken);

        if (newUser) {
            localStorage.setItem("user", JSON.stringify(newUser));
            setUser(newUser);
        } else {
            localStorage.removeItem("user");
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ token, user, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}