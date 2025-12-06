import { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    const [resources, setResources] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Subscribe to Resources
        const qResources = query(collection(db, "resources"));
        const unsubResources = onSnapshot(qResources, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setResources(data);
        });

        // Subscribe to Bookings
        const qBookings = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
        const unsubBookings = onSnapshot(qBookings, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBookings(data);
            setLoading(false);
        });

        return () => {
            unsubResources();
            unsubBookings();
        };
    }, []);

    const value = {
        resources,
        bookings,
        loading
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};
