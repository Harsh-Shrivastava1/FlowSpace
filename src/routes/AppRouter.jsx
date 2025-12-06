import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "../pages/Landing";
import UserLogin from "../pages/UserLogin";
import AdminLogin from "../pages/AdminLogin";
import NotFound from "../pages/NotFound";
import UserDashboard from "../pages/UserDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import ResourceBooking from "../pages/ResourceBooking";
import BookingStatus from "../pages/BookingStatus";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { AnimatePresence } from "framer-motion";

const AppRouter = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/admin-login" element={<AdminLogin />} />

                <Route path="/dashboard" element={
                    <ProtectedRoute role="user">
                        <UserDashboard />
                    </ProtectedRoute>
                } />

                <Route path="/book/:id" element={
                    <ProtectedRoute role="user">
                        <ResourceBooking />
                    </ProtectedRoute>
                } />

                <Route path="/my-bookings" element={
                    <ProtectedRoute role="user">
                        <BookingStatus />
                    </ProtectedRoute>
                } />

                <Route path="/admin-dashboard" element={
                    <ProtectedRoute role="admin">
                        <AdminDashboard />
                    </ProtectedRoute>
                } />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AppRouter;
