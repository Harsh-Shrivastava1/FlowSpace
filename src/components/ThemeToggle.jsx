import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = ({ className }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${theme === "dark"
                    ? "bg-[#0B1220] text-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-white/10"
                    : "bg-white text-yellow-500 hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] border border-gray-200"
                } ${className}`}
            aria-label="Toggle Theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 0 : 180 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
