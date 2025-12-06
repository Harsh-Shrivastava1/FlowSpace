import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";
import { updateBookingStatus } from "../data/bookings";
import { addResource, deleteResource, updateResourceStatus } from "../data/resources";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const AdminDashboard = () => {
    const { admin, logoutAdmin } = useAuth();
    const { bookings, resources, loading } = useBooking();
    const [activeTab, setActiveTab] = useState("bookings");

    const [newResource, setNewResource] = useState({
        name: "",
        type: "Room",
        location: "",
        capacity: ""
    });
    const [isAddingResource, setIsAddingResource] = useState(false);

    if (loading) return <Loader />;

    const handleApprove = async (id) => {
        if (confirm("Approve this booking? This will lock the slot.")) {
            await updateBookingStatus(id, "approved");
        }
    };

    const handleDecline = async (id) => {
        if (confirm("Decline this booking?")) {
            await updateBookingStatus(id, "declined");

            // Find the booking to get the resource ID and free it
            const bookingToDecline = bookings.find(b => b.id === id);
            if (bookingToDecline && bookingToDecline.resourceId) {
                const { freeResource } = await import("../firebase/firestore");
                await freeResource(bookingToDecline.resourceId);
            }
        }
    };

    const handleAddResource = async (e) => {
        e.preventDefault();
        await addResource(newResource);
        setNewResource({ name: "", type: "Room", location: "", capacity: "" });
        setIsAddingResource(false);
    };

    const handleDeleteResource = async (id) => {
        if (confirm("Delete this resource?")) {
            await deleteResource(id);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto"
        >
            <header className="flex flex-col md:flex-row justify-between items-center mb-12 glass-panel p-8 rounded-3xl border-l-[6px] border-indigo-500 shadow-xl relative overflow-hidden bg-white/80">
                <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-indigo-50 to-transparent pointer-events-none" />
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
                        Admin <span className="text-gradient-gold">Control Center</span>
                    </h1>
                    <p className="text-slate-500 text-sm font-semibold tracking-wide uppercase">System Overview & Management</p>
                </div>
                <div className="flex gap-2 mt-8 md:mt-0 bg-slate-100 p-2 rounded-2xl items-center shadow-inner border border-slate-200 relative z-10">
                    <button
                        onClick={() => setActiveTab("bookings")}
                        className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === "bookings" ? "bg-white text-slate-900 shadow-md scale-105" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"}`}
                    >
                        Bookings
                    </button>
                    <button
                        onClick={() => setActiveTab("resources")}
                        className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === "resources" ? "bg-white text-slate-900 shadow-md scale-105" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"}`}
                    >
                        Resources
                    </button>
                    <button
                        onClick={logoutAdmin}
                        className="px-6 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {activeTab === "bookings" && (
                <motion.div key="bookings" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.4 }}>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl text-slate-900 font-bold tracking-tight">Booking Requests</h2>
                        <span className="text-xs font-extra-bold text-white bg-blue-600 px-3 py-1.5 rounded-full shadow-lg shadow-blue-500/30">{bookings.length} Total</span>
                    </div>

                    <div className="grid gap-5">
                        {bookings.map((booking, index) => (
                            <motion.div
                                key={booking.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass-card p-6 rounded-[24px] flex flex-col md:flex-row items-center justify-between gap-6 hover:border-l-[6px] hover:border-l-blue-500 transition-all duration-300 group bg-white/60 border-white/60"
                            >
                                <div className="flex items-center gap-6 flex-1">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-xl font-bold text-slate-600 border border-slate-200 shadow-sm">
                                        {booking.userName.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{booking.userName}</h3>
                                        <div className="text-sm text-slate-500 flex items-center gap-2 font-semibold mt-1">
                                            <span>{booking.phone}</span> • <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-xs border border-indigo-100">{booking.resourceName}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-1 min-w-[200px]">
                                    <div className="text-sm text-slate-700 font-bold">{new Date(booking.startTime).toLocaleDateString()}</div>
                                    <div className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded">
                                        {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 min-w-[140px] justify-end">
                                    {booking.status === 'pending' ? (
                                        <>
                                            <button onClick={() => handleApprove(booking.id)} className="p-3 rounded-xl bg-green-50 text-green-600 hover:bg-green-500 hover:text-white hover:shadow-lg hover:shadow-green-500/30 transition-all" title="Approve">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                            </button>
                                            <button onClick={() => handleDecline(booking.id)} className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/30 transition-all" title="Decline">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                            </button>
                                        </>
                                    ) : (
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold capitalize border ${booking.status === 'approved' ? 'bg-green-50 text-green-600 border-green-200' :
                                            booking.status === 'declined' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-yellow-50 text-yellow-600 border-yellow-200'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                        {bookings.length === 0 && (
                            <div className="text-center text-slate-500 py-12 glass-panel rounded-2xl border-dashed border-slate-300">No bookings found.</div>
                        )}
                    </div>
                </motion.div>
            )}

            {activeTab === "resources" && (
                <motion.div key="resources" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl text-slate-900 font-bold">Resource Manager</h2>
                        <Button onClick={() => setIsAddingResource(!isAddingResource)} className="py-3 px-6 text-sm shadow-xl shadow-blue-500/20 btn-primary-gradient border-none">
                            {isAddingResource ? "Cancel" : "+ Add Resource"}
                        </Button>
                    </div>

                    {isAddingResource && (
                        <motion.form
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            onSubmit={handleAddResource}
                            className="glass-panel p-10 rounded-[32px] mb-10 grid grid-cols-1 md:grid-cols-2 gap-8 border border-white/60 bg-white/50 backdrop-blur-xl shadow-xl"
                        >
                            <div className="col-span-full mb-2">
                                <h3 className="text-xl font-bold text-slate-900">Add New Resource</h3>
                            </div>
                            <InputField
                                label="Resource Name"
                                value={newResource.name}
                                onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                                required
                            />
                            <InputField
                                label="Type"
                                value={newResource.type}
                                onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                                placeholder="Room, Lab, Desk..."
                                required
                            />
                            <InputField
                                label="Location"
                                value={newResource.location}
                                onChange={(e) => setNewResource({ ...newResource, location: e.target.value })}
                                required
                            />
                            <InputField
                                label="Capacity"
                                type="number"
                                value={newResource.capacity}
                                onChange={(e) => setNewResource({ ...newResource, capacity: e.target.value })}
                                required
                            />
                            <div className="col-span-full mt-4">
                                <Button type="submit" className="w-full py-4 text-lg btn-primary-gradient">Save Resource</Button>
                            </div>
                        </motion.form>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {resources.map((resource) => (
                            <div key={resource.id} className="glass-card p-8 rounded-[28px] relative group border border-white/60 bg-white/60 hover:border-blue-500/30 hover:shadow-xl transition-all duration-500">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500 shadow-sm text-indigo-500 border border-indigo-100">
                                        {resource.type === 'Lab' ? '🔬' : resource.type === 'Desk' ? '💻' : '🏢'}
                                    </div>
                                    <button onClick={() => handleDeleteResource(resource.id)} className="text-slate-400 hover:text-red-500 transition-colors p-2 bg-slate-100 rounded-lg hover:bg-red-50">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{resource.name}</h3>
                                <p className="text-slate-500 text-sm mb-6 font-semibold flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    {resource.location}
                                </p>

                                <div className="space-y-3 mb-8">
                                    <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                                        <span className="text-slate-500 font-medium">Type</span>
                                        <span className="text-slate-800 font-bold">{resource.type}</span>
                                    </div>
                                    <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                                        <span className="text-slate-500 font-medium">Capacity</span>
                                        <span className="text-slate-800 font-bold">{resource.capacity} People</span>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-between items-center">
                                    <span className={`text-xs font-extra-bold px-3 py-1.5 rounded-full border ${resource.status === 'available' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                                        {resource.status.toUpperCase()}
                                    </span>
                                    <button
                                        onClick={() => updateResourceStatus(resource.id, resource.status === 'available' ? 'maintenance' : 'available')}
                                        className="text-xs font-bold text-blue-600 hover:text-blue-500 underline decoration-2 decoration-blue-200 hover:decoration-blue-500"
                                    >
                                        Change Status
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default AdminDashboard;
