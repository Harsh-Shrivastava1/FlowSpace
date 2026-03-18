import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";


const UserDashboard = () => {
    const { user } = useAuth();
    const { resources, loading } = useBooking();
    const navigate = useNavigate();

    // Auto-release expired bookings in real-time
    useEffect(() => {
        const checkExpiry = async () => {
            if (!resources || resources.length === 0) return;

            const now = new Date();
            const { freeResource } = await import("../firebase/firestore");

            for (const resource of resources) {
                if (resource.status === 'booked' && resource.currentBookingEnd) {
                    const endTime = new Date(resource.currentBookingEnd);
                    if (now > endTime) {
                        console.log(`Auto-releasing resource: ${resource.name}`);
                        freeResource(resource.id);
                    }
                }
            }
        };

        const intervalId = setInterval(checkExpiry, 30000); // Check every 30 seconds
        checkExpiry(); // Run immediately on load

        return () => clearInterval(intervalId);
    }, [resources]);

    if (loading) return <Loader />;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto bg-transparent relative overflow-x-hidden"
        >
            {/* Premium Welcome Header */}
            <motion.header
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col md:flex-row justify-between items-center mb-20 p-12 rounded-[40px] relative overflow-hidden bg-white/70 backdrop-blur-2xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] border border-white"
            >
                {/* Subtle Gradient Border */}
                <div className="absolute inset-0 rounded-[40px] p-[2px] bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none -z-10" />

                {/* Glass Reflection Top */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/40 blur-[80px] rounded-full pointer-events-none" />

                <div className="z-10 relative">
                    <h1 className="text-5xl md:text-6xl font-black text-[#111827] mb-4 tracking-tight leading-tight">
                        Welcome, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">{user?.displayName ? user.displayName.split(' ')[0] : "User"}</span>
                        <span className="relative inline-block ml-4">
                            🚀
                            <span className="absolute inset-0 animate-ping opacity-20 bg-orange-400 rounded-full blur-xl scale-150" />
                        </span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium tracking-wide">Ready to book your next creative space? ✨</p>
                </div>

                <div className="flex flex-wrap gap-5 mt-10 md:mt-0 z-10 items-center">
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.15)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/my-bookings")}
                        className="px-8 py-3.5 bg-white text-slate-700 font-bold rounded-full border border-slate-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] transition-all duration-300 flex items-center gap-2 group"
                    >
                        <span className="bg-blue-50 text-blue-600 p-1.5 rounded-full text-xs">📅</span>
                        My Bookings
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => import("../firebase/auth").then(m => m.logout())}
                        className="px-8 py-3.5 bg-slate-100 text-slate-600 hover:text-rose-600 hover:bg-rose-50 font-bold rounded-full transition-all duration-300 flex items-center gap-2"
                    >
                        Logout
                    </motion.button>
                </div>
            </motion.header>

            {/* Layout Visual Divider */}
            <div className="mb-12 flex items-center gap-8">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight whitespace-nowrap">Available Resources</h2>
                <div className="h-[2px] w-full bg-gradient-to-r from-slate-200 via-slate-100 to-transparent rounded-full opacity-60 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 animate-shimmer" style={{ width: '50%', animation: 'shimmer 2s infinite linear' }} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources.map((resource, index) => {
                    const isAvailable = resource.capacity && Number(resource.capacity) > 0;
                    return (
                        <motion.div
                            key={resource.id}
                            layout
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)" }}
                            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                            className="group bg-slate-50/50 backdrop-blur-sm p-1 rounded-[36px] transition-all duration-300"
                        >
                            <div className="h-full bg-white rounded-[32px] p-8 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] flex flex-col justify-between relative overflow-hidden">

                                {/* Status Badge */}
                                <div className={`absolute top-6 right-6 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase backdrop-blur-md border shadow-sm z-10 flex items-center gap-1.5 ${isAvailable
                                    ? 'bg-emerald-50/80 text-emerald-600 border-emerald-100/50'
                                    : 'bg-rose-50/80 text-rose-500 border-rose-100/50'
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                                    {isAvailable ? 'Available' : 'Booked'}
                                </div>

                                <div className="mb-auto">
                                    {/* Icon Container with Gradient Ring */}
                                    <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center text-4xl mb-8 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_8px_16px_-4px_rgba(59,130,246,0.1)] relative group-hover:scale-105 transition-transform duration-500">
                                        <div className="absolute inset-0 rounded-[24px] border border-white/50" />
                                        {resource.type === 'Lab' ? '🔬' : resource.type === 'Desk' ? '💻' : '🏢'}
                                    </div>

                                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{resource.name}</h3>

                                    <div className="space-y-2.5">
                                        <div className="flex items-center gap-2.5 text-slate-500 text-sm font-semibold">
                                            <span className="p-1 rounded bg-slate-100 text-slate-400 text-xs">📍</span> {resource.location}
                                        </div>
                                        <div className="flex items-center gap-2.5 text-slate-500 text-sm font-semibold">
                                            <span className="p-1 rounded bg-slate-100 text-slate-400 text-xs">👥</span> Capacity: {resource.capacity}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-slate-50">
                                    <Button
                                        onClick={() => navigate(`/book/${resource.id}`)}
                                        className={`w-full py-4 text-[15px] font-bold rounded-2xl transition-all duration-300 ${isAvailable
                                            ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 hover:scale-[1.02] active:scale-[0.98]'
                                            : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                                            }`}
                                        disabled={!isAvailable}
                                    >
                                        {isAvailable ? 'Reserve Space' : 'Currently Unavailable'}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                {resources.length === 0 && (
                    <div className="col-span-full text-center text-slate-400 py-32 rounded-[32px] border-2 border-dashed border-slate-200 bg-slate-50/50">
                        <p className="text-lg font-medium">No resources found nearby.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default UserDashboard;
