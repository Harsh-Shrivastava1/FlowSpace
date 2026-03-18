import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const createBooking = async (bookingData) => {
    try {
        await addDoc(collection(db, "bookings"), {
            ...bookingData,
            status: "pending",
            createdAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        throw error;
    }
};

export const updateBookingStatus = async (bookingId, status) => {
    try {
        await updateDoc(doc(db, "bookings", bookingId), { status });
    } catch (error) {
        console.error("Error updating booking status:", error);
        throw error;
    }
};
