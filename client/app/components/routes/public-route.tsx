import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { ReactNode } from "react";

interface PublicRouteProps {
    children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
    const { user } = useAuth();

    if (user) return <Navigate to="/directory" replace />

    return children;
}