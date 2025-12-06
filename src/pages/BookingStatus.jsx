import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { motion, AnimatePresence } from "framer-motion";

const BookingStatus = () => {
    const { user } = useAuth();
    const { bookings, loading } = useBooking();
    const navigate = useNavigate();
    const [selectedReceipt, setSelectedReceipt] = useState(null);

    if (loading) return <Loader />;

    const myBookings = bookings.filter(b => b.userId === user?.uid);

    const toggleReceipt = (booking) => {
        setSelectedReceipt(booking);
    };

    const closeReceipt = () => {
        setSelectedReceipt(null);
    };

    return (
        <div className="min-h-screen p-6 md:p-10 max-w-5xl mx-auto relative">
            <header className="flex justify-between items-center mb-10 glass-panel p-6 rounded-2xl border border-white/60 bg-white/50">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Bookings</h1>
                <Button variant="secondary" onClick={() => navigate("/dashboard")} className="text-sm font-semibold text-slate-600 hover:text-slate-900">
                    &larr; Back to Dashboard
                </Button>
            </header>

            <div className="grid gap-5">
                {myBookings.map((booking, index) => {
                    const now = new Date();
                    const isExpired = new Date(booking.endTime) <= now;
                    let statusBadge;
                    let showReceiptButton = false;

                    // STATUS LOGIC
                    if (booking.status === "approved" && !isExpired) {
                        statusBadge = (
                            <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm font-bold flex items-center gap-2">
                                ✓ Confirmed
                            </span>
                        );
                        showReceiptButton = true;
                    } else if (booking.status === "approved" && isExpired) {
                        statusBadge = (
                            <span className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-bold flex items-center gap-2">
                                ⚠ Expired
                            </span>
                        );
                    } else if (booking.status === "pending") {
                        statusBadge = (
                            <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-sm font-bold flex items-center gap-2">
                                <span className="animate-pulse">●</span> Awaiting Approval
                            </span>
                        );
                    } else if (booking.status === "declined") {
                        statusBadge = (
                            <span className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-bold flex items-center gap-2">
                                ✕ Declined
                            </span>
                        );
                    }

                    return (
                        <motion.div
                            key={booking.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 border border-white/60 bg-white/70 shadow-sm hover:shadow-md"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-slate-900">{booking.resourceName}</h3>
                                    <span className="text-xs font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded tracking-wide">ID: {booking.id.slice(0, 6)}</span>
                                </div>
                                <p className="text-slate-700 text-sm flex items-center gap-2 font-semibold">
                                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-sm shadow-blue-500/30"></span>
                                    {new Date(booking.startTime).toLocaleString()}
                                    <span className="text-slate-400 font-bold text-xs uppercase">to</span>
                                    {new Date(booking.endTime).toLocaleString()}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                {statusBadge}
                                {showReceiptButton && (
                                    <button
                                        onClick={() => toggleReceipt(booking)}
                                        className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95"
                                    >
                                        View Receipt
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    );
                })}

                {myBookings.length === 0 && (
                    <div className="text-center text-slate-500 py-20 glass-panel rounded-3xl border border-dashed border-slate-300">
                        <div className="text-5xl mb-4 grayscale opacity-50">📅</div>
                        <p className="text-lg font-medium text-slate-600">You haven't made any bookings yet.</p>
                        <Button onClick={() => navigate("/dashboard")} className="mt-6 btn-primary-gradient shadow-lg">Book a Resource</Button>
                    </div>
                )}
            </div>

            {/* Receipt Modal */}
            <AnimatePresence>
                {selectedReceipt && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeReceipt}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl p-8 relative z-50 w-full max-w-md border border-slate-100"
                        >
                            <button onClick={closeReceipt} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 p-2 rounded-full">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>

                            <div className="text-center mb-8 border-b border-dashed border-slate-200 pb-6">
                                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-green-100 shadow-lg shadow-green-500/20">
                                    ✓
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">BOOKING RECEIPT</h2>
                                <p className="text-slate-500 font-medium text-sm">Thank you for using FlowSpace</p>
                            </div>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                    <span className="text-slate-500 font-bold uppercase text-xs tracking-wider">Name</span>
                                    <span className="text-slate-900 font-bold text-right">{selectedReceipt.userName}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                    <span className="text-slate-500 font-bold uppercase text-xs tracking-wider">Phone</span>
                                    <span className="text-slate-900 font-bold text-right">{selectedReceipt.phone}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                    <span className="text-slate-500 font-bold uppercase text-xs tracking-wider">Resource</span>
                                    <span className="text-slate-900 font-bold text-right">{selectedReceipt.resourceName}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                    <span className="text-slate-500 font-bold uppercase text-xs tracking-wider">Booked Capacity</span>
                                    <span className="text-slate-900 font-bold text-right">{selectedReceipt.requestedCapacity} People</span>
                                </div>
                                <div className="flex justify-between items-start py-2 border-b border-slate-50">
                                    <span className="text-slate-500 font-bold uppercase text-xs tracking-wider mt-1">Time</span>
                                    <div className="text-right">
                                        <div className="text-slate-900 font-bold">{new Date(selectedReceipt.startTime).toLocaleString()}</div>
                                        <div className="text-slate-400 font-bold text-xs uppercase my-0.5">to</div>
                                        <div className="text-slate-900 font-bold">{new Date(selectedReceipt.endTime).toLocaleString()}</div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-4">
                                    <span className="text-slate-500 font-bold uppercase text-xs tracking-wider">Status</span>
                                    <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full font-bold text-xs border border-green-100 flex items-center gap-1">
                                        Verified by Admin ✓
                                    </span>
                                </div>
                            </div>

                            <div className="mt-8">
                                <Button onClick={closeReceipt} className="w-full btn-primary-gradient py-3.5 shadow-xl shadow-indigo-500/20">Close Receipt</Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BookingStatus;
