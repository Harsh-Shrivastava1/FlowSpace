import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider, db } from "./firebaseConfig";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Keep login successful even when Firestore profile permissions are stricter.
        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    name: user.displayName,
                    email: user.email,
                    role: "user",
                    createdAt: serverTimestamp()
                });
            }
        } catch (profileError) {
            console.warn("User profile document could not be created/read.", profileError);
        }

        return user;
    } catch (error) {
        console.error("Error signing in with Google", error);
        throw error;
    }
};

export const logout = () => {
    return signOut(auth);
};
