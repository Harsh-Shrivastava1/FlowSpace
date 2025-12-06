import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LaunchScreen = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800); // Allow exit animation to finish
        }, 2200);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#030508] flex items-center justify-center overflow-hidden pointer-events-none"
        >
            <div className="relative flex flex-col items-center">
                {/* Background Glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full w-64 h-64"
                />

                {/* Logo Reveal */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative z-10 mb-6"
                >
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.3)]">
                        <span className="text-5xl font-bold text-white">F</span>
                    </div>
                </motion.div>

                {/* Text Reveal */}
                <div className="overflow-hidden h-12 relative z-10">
                    <motion.h1
                        initial={{ y: 50 }}
                        animate={{ y: 0 }}
                        transition={{
                            delay: 0.4,
                            duration: 1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="text-4xl font-bold text-white tracking-tight"
                    >
                        FlowSpace
                    </motion.h1>
                </div>

                {/* Loading Line */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 120, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-8"
                />
            </div>
        </motion.div>
    );
};

export default LaunchScreen;
