import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyAdminCredentials } from "../data/adminAuth";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

// Custom Secure Input Component - Enhanced with security visuals
const SecureInput = ({ label, type, value, onChange, placeholder, icon }) => (
    <div className="group space-y-3 relative">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 group-focus-within:text-blue-600 transition-colors pl-1 block flex items-center justify-between">
            <span>{label}</span>
            {value.length > 0 && (
                <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[10px] text-emerald-500 font-extrabold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100"
                >
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    VERIFIED
                </motion.span>
            )}
        </label>
        <div className="relative">
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
                className="w-full px-5 py-4 bg-white/70 backdrop-blur-md border border-slate-200 rounded-2xl outline-none text-slate-900 font-bold placeholder:text-slate-300 shadow-sm transition-all duration-300 focus:border-transparent focus:ring-[3px] focus:ring-blue-100/50 hover:border-blue-200/50 hover:shadow-lg hover:shadow-blue-500/5 relative z-10 peer pl-12 pr-12 group-hover:bg-white/90"
            />
            {/* Gradient Border Anim */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 p-[2px] opacity-0 peer-focus:opacity-100 transition-opacity duration-500 -z-0 pointer-events-none blur-[1px]" />

            {/* Inner Icon - Left Side for terminal feel */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-blue-600 transition-colors z-20 pointer-events-none">
                {icon}
            </div>

            {/* Validation Tick - Right Side */}
            <AnimatePresence>
                {value.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 z-20 pointer-events-none drop-shadow-sm"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </div>
);

const AdminLogin = () => {
    const navigate = useNavigate();
    const { loginAdmin } = useAuth();
    const [formData, setFormData] = useState({
        adminId: "",
        password: "",
        code: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showForgotModal, setShowForgotModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const adminData = await verifyAdminCredentials(formData.adminId, formData.password, formData.code);
            if (adminData) {
                loginAdmin(adminData);
                navigate("/admin-dashboard");
            } else {
                setError("Access Denied: Invalid Credentials.");
            }
        } catch (err) {
            setError("System Error: Verification Failed.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900 selection:bg-cyan-900 selection:text-cyan-100">
            {/* Background Security Grid */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900 z-0 pointer-events-none" />

            {/* Floating Cyber Orbs */}
            <motion.div
                animate={{
                    y: [0, -40, 0],
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none"
            />
            <motion.div
                animate={{
                    y: [0, 60, 0],
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-lg relative z-10 px-6"
            >
                {/* Main Login Card - Secure Terminal Style */}
                <div className="relative isolate bg-white/90 backdrop-blur-2xl rounded-[32px] shadow-[0_0_80px_-20px_rgba(8,145,178,0.3)] overflow-hidden border border-white/40 ring-1 ring-cyan-500/30">

                    {/* Neon Perimeter Glow */}
                    <div className="absolute inset-0 rounded-[32px] shadow-[inset_0_0_20px_rgba(6,182,212,0.15)] pointer-events-none z-20" />

                    {/* Top Active Bar */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 relative z-10 animate-pulse" />

                    <div className="px-10 py-12 relative z-10">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.1 }
                                }
                            }}
                        >
                            <div className="text-center mb-10 relative">
                                {/* Floating Shield Icon */}
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-24 h-24 mx-auto mb-6 relative group cursor-default"
                                >
                                    {/* Pulse Effect */}
                                    <motion.div
                                        animate={{ opacity: [0, 0.4, 0], scale: [1, 1.5, 1.8] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                                        className="absolute inset-0 bg-cyan-400/30 rounded-full blur-md"
                                    />
                                    <div className="relative w-full h-full bg-gradient-to-br from-slate-50 to-white rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-500/20 border border-cyan-100 ring-2 ring-cyan-50">
                                        <svg className="w-10 h-10 text-cyan-600 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                        </svg>

                                        {/* Tiny Status Indicator on Shield */}
                                        <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
                                    </div>
                                </motion.div>

                                <motion.h2
                                    variants={{ hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                                    className="text-3xl font-black text-slate-800 tracking-tight"
                                >
                                    SECURE ACCESS
                                </motion.h2>
                                <motion.p
                                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                                    className="text-xs font-bold text-red-500/80 uppercase tracking-wider mt-3 bg-red-50 py-1.5 px-4 rounded-full inline-block border border-red-100/50"
                                >
                                    ⚠ Access is monitored & protected. Unauthorized login prohibited.
                                </motion.p>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                                    className="bg-red-50 border-l-4 border-red-500 text-red-600 p-4 rounded-r-xl mb-8 text-sm font-bold flex items-center gap-3 shadow-sm"
                                >
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    {error}
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <motion.div variants={{ hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                                    <SecureInput
                                        label="System ID"
                                        value={formData.adminId}
                                        onChange={(e) => setFormData({ ...formData, adminId: e.target.value })}
                                        placeholder="Admin ID"
                                        type="text"
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                        }
                                    />
                                </motion.div>

                                <motion.div variants={{ hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                                    <SecureInput
                                        label="Encrypted Password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="••••••••"
                                        type="password"
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                        }
                                    />
                                </motion.div>

                                <motion.div variants={{ hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                                    <SecureInput
                                        label="Security Verification Code"
                                        value={formData.code}
                                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                        placeholder="••••••"
                                        type="password"
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        }
                                    />
                                </motion.div>

                                <motion.div
                                    variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                                    className="pt-4"
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 text-[15px] font-bold text-white shadow-2xl shadow-cyan-500/20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-700 hover:border-cyan-500/50 hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
                                    >
                                        {/* Shiny Wipe Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />

                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                Decrypting...
                                            </span>
                                        ) : (
                                            <>
                                                <span className="relative z-10 tracking-widest uppercase text-sm">Authenticate Access</span>
                                                <svg className="w-5 h-5 relative z-10 text-cyan-400 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                            </>
                                        )}
                                    </motion.button>
                                </motion.div>
                            </form>
                        </motion.div>

                        <div className="mt-8 flex flex-col items-center gap-4 text-sm font-semibold relative z-10">
                            <button
                                onClick={() => setShowForgotModal(true)}
                                className="text-slate-400 hover:text-cyan-600 transition-colors text-xs tracking-wider font-bold hover:underline decoration-cyan-500/30 underline-offset-4"
                            >
                                LOST CREDENTIALS?
                            </button>

                            <div className="w-full border-t border-slate-200/60 my-2"></div>

                            <button onClick={() => navigate("/")} className="text-slate-400 hover:text-slate-900 transition-colors inline-flex items-center gap-2 group text-xs font-bold uppercase tracking-wide">
                                <span className="group-hover:-translate-x-1 transition-transform">←</span> Abort to Public Site
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Restricted Access Alert Modal */}
            <AnimatePresence>
                {showForgotModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md"
                        onClick={() => setShowForgotModal(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-slate-900 p-8 rounded-[24px] shadow-2xl max-w-sm w-full text-center relative overflow-hidden border border-slate-700 ring-1 ring-cyan-500/20"
                        >
                            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-500/10 flex items-center justify-center text-3xl shadow-inner border border-red-500/20">
                                <span className="drop-shadow-lg">⛔</span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Access Violation</h3>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed px-4">
                                This terminal is restricted to Level 3 Administrators only. Identify yourself to the developer for recovery protocols.
                            </p>

                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 mb-6">
                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Secure Contact Channel</p>
                                <p className="text-cyan-400 font-mono text-xs break-all font-bold selection:bg-cyan-900">hshrivastava23032007@gmail.com</p>
                            </div>

                            <button
                                onClick={() => setShowForgotModal(false)}
                                className="w-full py-3.5 rounded-xl bg-white text-slate-900 font-bold transition-all hover:bg-slate-200 hover:shadow-lg hover:shadow-white/10 active:scale-95 tracking-wide uppercase text-xs"
                            >
                                Acknowledge & Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminLogin;
