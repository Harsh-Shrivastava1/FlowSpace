import { motion } from "framer-motion";

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-full w-full min-h-[200px]">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
            />
        </div>
    );
};

export default Loader;
