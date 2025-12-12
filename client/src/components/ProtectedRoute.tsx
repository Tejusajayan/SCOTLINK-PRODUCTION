import { useEffect } from "react";
import { useLocation } from "wouter";

interface ProtectedRouteProps {
    component: React.ComponentType;
}

export function ProtectedRoute({ component: Component }: ProtectedRouteProps) {
    const [, setLocation] = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("adminToken");

        if (!token) {
            // Redirect to login if no token
            setLocation("/vscolog");
            return;
        }

        // Optional: Add token expiration check here if you implement JWT with expiration
        try {
            // You can add JWT decode and expiration validation here
            // For now, we just check if token exists
        } catch (error) {
            // If token is invalid, remove it and redirect
            localStorage.removeItem("adminToken");
            setLocation("/vscolog");
        }
    }, [setLocation]);

    const token = localStorage.getItem("adminToken");

    // Only render component if authenticated
    if (!token) {
        return null;
    }

    return <Component />;
}
