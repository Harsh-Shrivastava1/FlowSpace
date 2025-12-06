import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Google User
    const [admin, setAdmin] = useState(null); // Admin User
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const loginAdmin = (adminData) => {
        setAdmin(adminData);
        localStorage.setItem("flowspace_admin", JSON.stringify(adminData));
    };

    const logoutAdmin = () => {
        setAdmin(null);
        localStorage.removeItem("flowspace_admin");
    };

    // Persist admin session
    useEffect(() => {
        const storedAdmin = localStorage.getItem("flowspace_admin");
        if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
        }
    }, []);

    const value = {
        user,
        admin,
        loginAdmin,
        logoutAdmin,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
