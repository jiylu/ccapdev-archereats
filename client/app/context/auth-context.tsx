import { useState } from "react";
import type { ReactNode } from "react"; 
import type { User } from "../types/user";
import { AuthContext } from "../hooks/useAuth";


interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    const setAuth = (newUser?: User | null) => {
        if (newUser) {
            localStorage.setItem("user", JSON.stringify(newUser));
            setUser(newUser);
        } else {
            localStorage.removeItem("user");
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}