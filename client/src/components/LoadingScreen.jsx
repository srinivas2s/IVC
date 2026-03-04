import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const LoadingScreen = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
            className="fixed inset-0 z-[200] bg-[#02040a] flex items-center justify-center overflow-hidden"
        >
            {/* TechSolstice-style dot/cross grid */}
            <div className="absolute inset-0 bg-cross-grid opacity-60" />

            {/* Ambient glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-500/[0.03] blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-500/[0.03] blur-[120px] rounded-full" />

            <div className="relative z-10 flex flex-col items-center">
                {/* Logo Section - Removed rings */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative mb-12"
                >
                    {/* Logo glow bloom */}
                    <div className="absolute inset-[-40%] bg-cyan-400/10 blur-[50px] rounded-full animate-pulse-glow" />

                    <motion.img
                        src={logo}
                        alt="IVC Logo"
                        className="relative w-32 h-32 md:w-44 md:h-44 drop-shadow-[0_0_50px_rgba(34,211,238,0.2)] z-10"
                    />
                </motion.div>

                {/* Status Bar - TechSolstice style */}
                <div className="flex flex-col items-center gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-3"
                    >
                        <span className="font-display text-[10px] tracking-[0.6em] text-cyan-400 text-glow-cyan uppercase">Initializing</span>
                        <div className="flex gap-1">
                            {[0, 1, 2].map(i => (
                                <motion.div
                                    key={i}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                    className="w-1 h-1 bg-cyan-400 rounded-full"
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Progress slider bar */}
                    <div className="w-48 h-[1px] bg-white/5 relative overflow-hidden">
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                        />
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="font-display text-[8px] tracking-[0.4em] text-white/30 uppercase"
                    >
                        Innovators & Visionaries Club
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;