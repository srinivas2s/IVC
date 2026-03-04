import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const LoadingScreen = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeOut" } }}
            className="fixed inset-0 z-[200] bg-[#060b18] flex items-center justify-center"
        >
            {/* Blueprint grid */}
            <div className="absolute inset-0 bg-blueprint opacity-30" />

            {/* Ambient glow */}
            <motion.div
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(34,211,238,0.08)_0%,transparent_70%)] blur-[40px]"
            />

            {/* Scan line */}
            <motion.div
                animate={{ top: ['-5%', '105%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[1px] bg-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.15)] pointer-events-none"
            />

            <div className="relative z-10 flex flex-col items-center">
                {/* Logo */}
                <motion.div className="relative mb-10">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-40%] rounded-full border border-cyan-400/[0.06]"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-25%] rounded-full border border-indigo-400/[0.04]"
                    />
                    <motion.img
                        layoutId="main-logo"
                        src={logo}
                        alt="IVC Logo"
                        initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-28 h-28 md:w-40 md:h-40 drop-shadow-[0_0_60px_rgba(34,211,238,0.25)] z-10"
                    />
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="font-display text-4xl md:text-6xl font-black tracking-wider uppercase text-white mb-4"
                >
                    <span className="text-cyan-400 text-glow-cyan">I</span>VC
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="font-display text-[9px] md:text-[11px] tracking-[0.4em] text-white/30 uppercase mb-10"
                >
                    Innovators & Visionaries Club
                </motion.p>

                {/* Loading bar */}
                <motion.div className="w-32 h-[1px] bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;