import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-white selection:bg-blue-100 selection:text-blue-900">

      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white z-0" />

      {/* Floating Gradient Orb */}
      <motion.div
        animate={{
          y: [0, -40, 0],
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-[120px] pointer-events-none z-0"
      />
      <motion.div
        animate={{
          y: [0, 60, 0],
          x: [0, -30, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-400/10 to-indigo-400/10 blur-[100px] pointer-events-none z-0"
      />

      {/* Top Right About Button */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        onClick={() => setShowAbout(true)}
        className="absolute top-8 right-8 z-20 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm text-sm font-semibold text-slate-600 hover:text-slate-900 hover:shadow-md transition-all duration-300 group"
      >
        <span className="group-hover:mr-1 transition-all">About FlowSpace</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">→</span>
      </motion.button>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100, damping: 20 }}
          className="inline-block mb-6"
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
            Next Gen Workspace
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight"
        >
          Flow<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Space</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
        >
          Orchestrate your workspace with effortless precision.
          <br className="hidden md:block" /> Smart booking for modern teams.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="px-10 py-4 rounded-2xl text-white font-bold text-lg shadow-xl shadow-blue-500/20 bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/40 transition-all duration-300 w-full sm:w-auto"
          >
            User Application
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admin-login")}
            className="px-10 py-4 rounded-2xl text-slate-700 font-bold text-lg bg-white border border-slate-200 shadow-lg shadow-slate-200/50 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 w-full sm:w-auto"
          >
            Admin Portal
          </motion.button>
        </motion.div>
      </div>

      {/* About Modal */}
      <AnimatePresence>
        {showAbout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/20 backdrop-blur-sm"
            onClick={() => setShowAbout(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-2xl p-8 md:p-12 rounded-[32px] shadow-2xl border border-white/60 relative overflow-hidden"
            >
              {/* Modal Background Gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-[80px] -z-10" />

              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shadow-sm border border-blue-100">
                    🚀
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">About FlowSpace</h2>
                </div>
                <button
                  onClick={() => setShowAbout(false)}
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">📘 About FlowSpace</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    FlowSpace is an intelligent workspace booking and resource allocation system designed for campuses, organizations and modern digital environments. The platform ensures fair usage, live availability tracking, admin-controlled approvals and automated release of spaces after booking time ends.
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">────────── HOW BOOKING WORKS ──────────</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-indigo-600 font-bold text-lg leading-none mt-0.5">①</span>
                      <div>
                        <strong className="text-slate-900 block text-sm mb-1">Login & Authenticate</strong>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          Secure sign-in is required. Users can browse available resources in real-time and check current remaining capacity before booking.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-indigo-600 font-bold text-lg leading-none mt-0.5">②</span>
                      <div>
                        <strong className="text-slate-900 block text-sm mb-1">Select Resource & Request Capacity</strong>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          Users choose a space (Lab, Parking, Library etc.) and enter how many slots they need.<br />
                          Requested capacity must be <strong>less than or equal to the available capacity</strong>.<br />
                          <span className="text-slate-400 text-xs mt-1 block">Example: If total capacity is 9 and someone books 4, availability becomes <strong>5</strong> and the slot remains bookable until availability = 0.</span>
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-indigo-600 font-bold text-lg leading-none mt-0.5">③</span>
                      <div>
                        <strong className="text-slate-900 block text-sm mb-1">Admin Review & Approval</strong>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          Request enters <strong>Pending status</strong>. Admin can Approve or Decline.<br />
                          If approved → capacity decreases automatically.<br />
                          If declined → full capacity returns instantly.<br />
                          If multiple users book, capacity updates live for all.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">BOOKING STATUS SYSTEM</h3>
                    <ul className="text-sm text-slate-600 space-y-2">
                      <li>• <strong>Pending:</strong> Request sent, awaiting admin approval.</li>
                      <li>• <strong>Approved & Active:</strong> Booking is confirmed and running — user can open Receipt.</li>
                      <li>• <strong>Declined:</strong> Admin rejected request — resource becomes available again.</li>
                      <li>• <strong>Expired:</strong> End-time reached automatically — capacity restores & booking closes.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">RECEIPT GENERATION</h3>
                    <p className="text-sm text-slate-600 mb-2">
                      A digital receipt becomes available only when booking is approved.
                    </p>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-500 font-mono">
                      ✓ User Name<br />
                      ✓ Phone<br />
                      ✓ Resource Name<br />
                      ✓ Start Time → End Time<br />
                      ✓ Capacity Booked<br />
                      ✓ Verified & Approved by Admin (green badge)
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-200 pb-2">────────── ADMIN POWERS ──────────</h3>
                  <ul className="text-sm text-slate-600 space-y-1 mb-3">
                    <li>• Add, edit or delete resources</li>
                    <li>• Set initial capacity value</li>
                    <li>• Approve/Decline bookings</li>
                    <li>• View usage live & reset availability after expiry</li>
                  </ul>
                  <p className="text-indigo-600 text-sm font-medium border-t border-slate-200 pt-3 mt-2">
                    FlowSpace fully automates booking distribution, avoids misuse, prevents double allocations, and improves space usage efficiency across the entire institution.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;
