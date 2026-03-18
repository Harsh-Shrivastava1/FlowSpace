import { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "./AuthContext";

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    const { user, admin, loading: authLoading } = useAuth();
    const [resources, setResources] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (authLoading) {
            return;
        }

        // Avoid attaching Firestore listeners for guests to prevent permission-denied loops.
        if (!user && !admin) {
            setResources([]);
            setBookings([]);
            setError(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        // Subscribe to Resources
        const qResources = query(collection(db, "resources"));
        const unsubResources = onSnapshot(
            qResources,
            (snapshot) => {
                const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setResources(data);
                setError(null);
            },
            (snapshotError) => {
                console.error("Resources listener failed:", snapshotError);
                setError(snapshotError.message || "Unable to load resources.");
                setResources([]);
                setLoading(false);
            }
        );

        // Subscribe to Bookings
        const qBookings = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
        const unsubBookings = onSnapshot(
            qBookings,
            (snapshot) => {
                const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setBookings(data);
                setLoading(false);
                setError(null);
            },
            (snapshotError) => {
                console.error("Bookings listener failed:", snapshotError);
                setError(snapshotError.message || "Unable to load bookings.");
                setBookings([]);
                setLoading(false);
            }
        );

        return () => {
            unsubResources();
            unsubBookings();
        };
    }, [user, admin, authLoading]);

    const value = {
        resources,
        bookings,
        loading,
        error
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};
