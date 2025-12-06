import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children, role }) => {
    const { user, admin } = useAuth();

    if (role === "admin") {
        if (!admin) return <Navigate to="/admin-login" replace />;
        return children;
    }

    if (role === "user") {
        if (!user) return <Navigate to="/login" replace />;
        return children;
    }

    return children;
};
