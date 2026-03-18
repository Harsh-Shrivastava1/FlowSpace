import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../firebase/auth";
import Button from "../components/Button";
import { motion } from "framer-motion";

const UserLogin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        setError("");
        try {
            await signInWithGoogle();
            navigate("/dashboard");
        } catch (err) {
            setError("Failed to sign in via Google. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white selection:bg-blue-100 selection:text-blue-900">
            {/* Background Premium Glow Clusters */}
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none opacity-60" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-violet-100/40 rounded-full blur-[120px] pointer-events-none opacity-60" />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md relative z-10 px-6"
            >
                {/* Hero Card with Premium Deep Shadow & Glass Highlight */}
                <div className="relative bg-white/80 p-10 rounded-[32px] shadow-[0_30px_60px_-12px_rgba(50,50,93,0.15),0_18px_36px_-18px_rgba(0,0,0,0.1)] backdrop-blur-xl border border-white overflow-hidden">

                    {/* Gradient Border Accent */}
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 to-violet-500" />

                    {/* Subtle Top Glass Reflection */}
                    <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />

                    <div className="text-center mb-10 relative z-10">
                        {/* Avatar / Icon Upgrade */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                            className="w-20 h-20 mx-auto mb-8 relative group"
                        >
                            <motion.div
                                animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.95, 1.05, 0.95] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl"
                            />
                            <div className="relative w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 text-3xl font-bold text-white overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="relative z-10">F</span>
                            </div>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-4xl font-black mb-3 text-slate-900 tracking-tight"
                        >
                            Welcome Back
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="text-slate-500 text-lg font-medium tracking-wide"
                        >
                            Secure access to your FlowSpace
                        </motion.p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl mb-6 text-sm flex items-center justify-center font-bold animate-pulse">
                            {error}
                        </div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="space-y-4"
                    >
                        <Button
                            onClick={handleLogin}
                            disabled={loading}
                            className={`
                                w-full py-4 text-[15px] font-bold rounded-xl
                                bg-white text-slate-700 border border-slate-200 
                                shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)]
                                hover:shadow-[0_10px_15px_-3px_rgba(59,130,246,0.1),0_4px_6px_-2px_rgba(59,130,246,0.05)]
                                hover:border-blue-200 hover:text-slate-900 hover:bg-gradient-to-r hover:from-white hover:to-blue-50/50
                                active:scale-[0.98] transition-all duration-200 relative overflow-hidden group
                            `}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
                                    Connecting...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-3 relative z-10">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Continue with Google
                                </span>
                            )}
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="mt-10 pt-6 border-t border-slate-100 text-center"
                    >
                        <button onClick={() => navigate("/")} className="text-sm text-slate-400 hover:text-slate-800 transition-colors inline-flex items-center gap-2 group font-medium">
                            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Public Site
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default UserLogin;
