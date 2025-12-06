import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const addResource = async (resourceData) => {
    try {
        await addDoc(collection(db, "resources"), {
            ...resourceData,
            status: "available", // Default status
            createdAt: new Date()
        });
    } catch (error) {
        console.error("Error adding resource:", error);
        throw error;
    }
};

export const deleteResource = async (resourceId) => {
    try {
        await deleteDoc(doc(db, "resources", resourceId));
    } catch (error) {
        console.error("Error deleting resource:", error);
        throw error;
    }
};

export const updateResourceStatus = async (resourceId, status) => {
    try {
        await updateDoc(doc(db, "resources", resourceId), { status });
    } catch (error) {
        console.error("Error updating resource status:", error);
        throw error;
    }
};
