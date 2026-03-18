import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const verifyAdminCredentials = async (adminId, password, code) => {
    try {
        const adminRef = doc(db, "adminAuth", adminId);
        const adminSnap = await getDoc(adminRef);

        if (adminSnap.exists()) {
            const data = adminSnap.data();
            if (data.password === password && data.code === code) {
                return { ...data, uid: adminId }; // Return admin data on success
            }
        }
        return null; // Return null if validation fails
    } catch (error) {
        console.error("Error verifying admin:", error);
        throw error;
    }
};
