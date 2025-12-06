import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import AppRouter from "./routes/AppRouter";
import "./styles/global.css";
import "./styles/animation.css";
import { useState } from "react";
import LaunchScreen from "./components/LaunchScreen";
import { motion, AnimatePresence } from "framer-motion";

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <>
            <AnimatePresence mode="wait">
                {loading && <LaunchScreen onComplete={() => setLoading(false)} />}
            </AnimatePresence>

            {!loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <BrowserRouter>
                        <AuthProvider>
                            <BookingProvider>
                                <AppRouter />
                            </BookingProvider>
                        </AuthProvider>
                    </BrowserRouter>
                </motion.div>
            )}
        </>
    );
}

export default App;
