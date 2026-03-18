import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";
import { createBooking } from "../data/bookings";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { motion } from "framer-motion";

const ResourceBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { resources } = useBooking();

    const resource = resources.find(r => r.id === id);

    const [formData, setFormData] = useState({
        phone: "",
        startTime: "",
        endTime: "",
        capacity: ""
    });
    const [loading, setLoading] = useState(false);

    if (!resource) return <div className="text-white p-10 text-center">Loading resource...</div>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const requestedCapacity = parseInt(formData.capacity, 10);
        const availableCapacity = parseInt(resource.capacity, 10);

        if (isNaN(requestedCapacity) || requestedCapacity <= 0) {
            alert("Please enter a valid capacity.");
            setLoading(false);
            return;
        }

        if (requestedCapacity > availableCapacity) {
            alert("Requested seats exceed available capacity");
            setLoading(false);
            return;
        }

        try {
            await createBooking({
                userId: user.uid,
                userName: user.displayName,
                userEmail: user.email,
                phone: formData.phone,
                resourceId: id,
                resourceName: resource.name,
                startTime: formData.startTime,
                endTime: formData.endTime,
                requestedCapacity: requestedCapacity
            });

            // Lock the resource in Firestore and update capacity
            const { bookResource } = await import("../firebase/firestore");
            await bookResource(id, formData.startTime, formData.endTime, requestedCapacity);

            navigate("/my-bookings");
        } catch (error) {
            console.error(error);
            alert("Failed to create booking");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="glass-panel p-0 rounded-3xl w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl"
            >
                {/* Vivid Accent Line */}
                <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

                <div className="p-10 md:p-12">
                    <div className="mb-10 text-center">
                        <span className="bg-blue-50 text-blue-600 text-xs font-extrabold tracking-widest uppercase mb-4 inline-block px-3 py-1 rounded-full border border-blue-100">
                            New Request
                        </span>
                        <h2 className="text-4xl font-extrabold text-slate-900 mb-3">
                            Book <span className="text-gradient">{resource.name}</span>
                        </h2>
                        <p className="text-slate-500 text-lg">
                            Secure this space for your next big idea.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Name</p>
                                    <p className="text-slate-900 font-semibold text-lg">{user?.displayName}</p>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Email</p>
                                    <p className="text-slate-900 font-semibold text-lg truncate">{user?.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <InputField
                                label="Phone Number"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+1 (555) 000-0000"
                                required
                                className="font-medium"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Start Time"
                                    type="datetime-local"
                                    value={formData.startTime}
                                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                    required
                                    className="font-medium"
                                />
                                <InputField
                                    label="End Time"
                                    type="datetime-local"
                                    value={formData.endTime}
                                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                    required
                                    className="font-medium"
                                />
                            </div>

                            <InputField
                                label={`Capacity (Max: ${resource.capacity})`}
                                type="number"
                                value={formData.capacity}
                                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                required
                                placeholder="Number of people"
                                className="font-medium"
                            />
                        </div>

                        <div className="flex gap-4 mt-6 pt-6 border-t border-slate-100">
                            <Button variant="secondary" onClick={() => navigate("/dashboard")} className="flex-1 py-4 text-base font-bold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading} className={`flex-1 py-[14px] text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[10px] shadow-[0_8px_18px_rgba(147,51,234,0.25)] hover:scale-[1.04] transition-all duration-[250ms]`}>
                                {loading ? "Confirming..." : "Confirm Booking"}
                            </Button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default ResourceBooking;
