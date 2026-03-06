import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const Home = ({ isPastHome }) => {
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const logoY = useTransform(smoothProgress, [0, 1], [0, -200]);
    const logoScale = useTransform(smoothProgress, [0, 0.5], [1, 0.7]);
    const textOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
    const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        >
            {/* ===== CINEMATIC RED BACKGROUND EFFECTS ===== */}

            {/* Ambient radial gradients - slowly moving */}
            <motion.div
                style={{ scale: bgScale }}
                className="absolute inset-0 pointer-events-none bg-[#02040a]"
            >
                <motion.div
                    animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-15%] left-[-15%] w-[100vw] h-[100vw] bg-[radial-gradient(circle,rgba(34,211,238,0.12)_0%,transparent_70%)] will-change-transform"
                />
                <motion.div
                    animate={{ x: [0, -30, 50, 0], y: [0, 30, -40, 0] }}
                    transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-15%] right-[-15%] w-[90vw] h-[90vw] bg-[radial-gradient(circle,rgba(99,102,241,0.1)_0%,transparent_70%)] will-change-transform"
                />
                {/* Center blue spotlight */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] h-[110vw] bg-[radial-gradient(circle,rgba(34,211,238,0.06)_0%,transparent_60%)]" />

                {/* Heavy Cinematic Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,4,10,0.85)_100%)]" />

                {/* Texture layer */}
                <div className="absolute inset-0 bg-dot-matrix opacity-[0.03] mix-blend-overlay" />
            </motion.div>
            {/* ===== CENTRAL CONTENT ===== */}
            <motion.div
                style={{ y: logoY, scale: logoScale }}
                className="relative z-10 flex flex-col items-center px-4"
            >
                {/* 3D Logo with reactive tilt */}
                <motion.div
                    className="relative mb-8 md:mb-12"
                    style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
                >
                    {/* The logo */}
                    <AnimatePresence mode="wait">
                        {!isPastHome && (
                            <motion.img
                                layoutId="main-logo"
                                src={logo}
                                alt="IVC Logo"
                                initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="relative w-44 h-44 md:w-64 md:h-64 lg:w-80 lg:h-80 drop-shadow-[0_0_120px_rgba(34,211,238,0.35)] z-10"
                                style={{ transform: 'translateZ(60px)' }}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Club name - massive Orbitron typography */}
                <motion.div style={{ opacity: textOpacity }} className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 mb-6 w-full px-2"
                    >
                        <div className="h-[1px] w-4 sm:w-16 md:w-32 bg-gradient-to-r from-transparent to-cyan-400/40 shrink-0" />
                        <span className="font-display text-[11px] min-[360px]:text-[12px] min-[400px]:text-[15px] sm:text-[20px] md:text-[28px] lg:text-[2.5rem] font-bold tracking-[0.1em] sm:tracking-[0.3em] md:tracking-[0.4em] text-cyan-400 uppercase text-glow-cyan whitespace-nowrap">
                            Innovators & Visionaries Club
                        </span>
                        <div className="h-[1px] w-4 sm:w-16 md:w-32 bg-gradient-to-l from-transparent to-cyan-400/40 shrink-0" />
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-20 md:bottom-28 left-0 right-0 border-y border-white/[0.04] py-6 z-10"
            >
                <div className="flex items-center justify-center w-full px-4">
                    <div className="flex items-center justify-between w-full max-w-[300px] sm:max-w-[400px] md:max-w-none md:justify-center md:gap-24">
                        {["IDEATE", "VISUALIZE", "CREATE"].map((word, i) => (
                            <div key={i} className="flex items-center md:gap-24">
                                <span className="font-display text-[8px] sm:text-[10px] md:text-xl tracking-widest md:tracking-[0.5em] text-cyan-400 font-bold whitespace-nowrap text-glow-cyan drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                                    {word}
                                </span>
                                {i < 2 && (
                                    <span className="ml-[0.6rem] sm:ml-4 md:ml-0 w-[3px] md:w-1.5 h-[3px] md:h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>


        </div>
    );
};

export default Home;
