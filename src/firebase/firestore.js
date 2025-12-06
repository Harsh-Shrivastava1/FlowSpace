import { doc, runTransaction } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Function to lock a resource when booked (Atomic Transaction)
export const bookResource = async (resourceId, start, end, capacity) => {
    try {
        const resourceRef = doc(db, "resources", resourceId);
        await runTransaction(db, async (transaction) => {
            const resourceDoc = await transaction.get(resourceRef);
            if (!resourceDoc.exists()) {
                throw "Resource does not exist!";
            }

            const currentCapacity = resourceDoc.data().capacity;
            const requestedCapacity = Number(capacity);

            // Logic: newCapacity = Number(currentCapacity) - Number(requestedCapacity)
            let newCapacity = Number(currentCapacity) - requestedCapacity;

            // Prevent negative capacity
            if (newCapacity < 0) newCapacity = 0;

            transaction.update(resourceRef, {
                status: "booked",
                currentBookingStart: start,
                currentBookingEnd: end,
                currentBookingCapacity: requestedCapacity,
                capacity: newCapacity
            });
        });
    } catch (error) {
        console.error("Error booking resource:", error);
    }
};

// Function to free a resource (restores capacity exactly)
export const freeResource = async (resourceId) => {
    try {
        const resourceRef = doc(db, "resources", resourceId);
        await runTransaction(db, async (transaction) => {
            const resourceDoc = await transaction.get(resourceRef);
            if (!resourceDoc.exists()) {
                throw "Resource does not exist!";
            }

            const currentCapacity = resourceDoc.data().capacity;
            const bookedCapacity = resourceDoc.data().currentBookingCapacity;

            // Logic: restoredCapacity = Number(currentCapacity) + Number(requestedCapacity)
            const restoredCapacity = Number(currentCapacity) + Number(bookedCapacity || 0);

            transaction.update(resourceRef, {
                status: "available",
                currentBookingStart: null,
                currentBookingEnd: null,
                currentBookingCapacity: 0,
                capacity: restoredCapacity
            });
        });
    } catch (error) {
        console.error("Error freeing resource:", error);
    }
};

// Legacy function - kept for compatibility but safe logic moved to book/free
export const updateResourceCapacity = async (resourceId, change) => {
    // This is no longer the primary method for booking flow
    // We leave it empty or log warning to ensure no double-updates if called
    console.warn("updateResourceCapacity is deprecated for booking flows. Use bookResource/freeResource.");
};
