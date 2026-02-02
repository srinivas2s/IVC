import { motion } from 'framer-motion';

const LoadingScreen = () => {
    const tagline = "IDEATE VISUALIZE AND CREATE";
    const words = tagline.split(" ");

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
        >
            {/* Animated Background Elements - Neutral */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/[0.02] blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/[0.02] blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Logo Container */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                    scale: [0.5, 1.05, 1],
                    opacity: 1,
                    y: [0, -10, 0]
                }}
                transition={{
                    duration: 3,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
                className="relative z-10 mb-12"
            >
                <div className="relative flex items-center justify-center">
                    {/* Inner Energy Ring - Neutral */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-4 md:-inset-6 border-[1.5px] border-dashed border-white/10 rounded-full"
                    />

                    {/* Outer Energy Ring - Neutral */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-8 md:-inset-10 border-[1px] border-dashed border-white/5 rounded-full"
                    />

                    {/* Core Glow - Subtle White */}
                    <div className="absolute inset-0 bg-white/[0.02] blur-2xl rounded-full" />

                    <motion.img
                        layoutId="main-logo"
                        src="/logo_loading.png"
                        alt="IVC Logo"
                        className="w-32 h-32 md:w-40 md:h-40 object-contain relative z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                    />
                </div>
            </motion.div>

            {/* Tagline - Acts as Loading Progress */}
            <div className="relative z-10 mt-8 flex flex-col items-center">
                <div className="relative text-xl md:text-3xl font-extrabold tracking-[0.2em] md:tracking-[0.4em] uppercase text-center px-4">
                    {/* Background "Empty" State - Faint Ghost Text */}
                    <span className="text-white/[0.03] whitespace-nowrap select-none">
                        {tagline}
                    </span>

                    {/* Foreground "Loading" State - Gradient Reveal */}
                    <motion.span
                        initial={{ clipPath: 'inset(0 100% 0 0)' }}
                        animate={{ clipPath: 'inset(0 0% 0 0)' }}
                        transition={{
                            duration: 1.8,
                            ease: [0.45, 0.05, 0.55, 0.95],
                            delay: 0.2
                        }}
                        className="absolute inset-0 px-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 whitespace-nowrap border-r-[3px] border-white/20"
                    >
                        {tagline}
                    </motion.span>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="mt-6 text-[10px] md:text-xs tracking-[0.3em] text-gray-500/60 uppercase font-medium"
                >
                    Innovating the Future
                </motion.p>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
