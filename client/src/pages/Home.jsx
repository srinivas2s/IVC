import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const Home = ({ isPastHome }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const logoY = useTransform(smoothProgress, [0, 1], [0, -150]);
    const logoScale = useTransform(smoothProgress, [0, 0.5], [1, 0.8]);
    const textOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleMouseMove = (e) => {
        if (isMobile) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        setMousePos({ x, y });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-blueprint"
        >
            {/* Ambient glow orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-cyan-500/[0.04] rounded-full blur-[150px] animate-nebula pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-500/[0.04] rounded-full blur-[150px] animate-nebula-reverse pointer-events-none" />

            {/* Scan line effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute left-0 right-0 h-[1px] bg-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.3)] animate-scan" />
            </div>

            {/* Central content */}
            <motion.div
                style={{ y: logoY, scale: logoScale }}
                className="relative z-10 flex flex-col items-center px-4"
            >
                {/* 3D Logo with glow */}
                <motion.div
                    animate={{
                        rotateX: mousePos.y * -0.15,
                        rotateY: mousePos.x * 0.15,
                    }}
                    transition={{ type: "spring", stiffness: 50, damping: 30 }}
                    className="relative mb-8"
                    style={{ perspective: '1000px' }}
                >
                    {/* Glow ring behind logo */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-30%] rounded-full border border-cyan-500/10 pointer-events-none"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-50%] rounded-full border border-indigo-500/5 pointer-events-none"
                    />

                    {/* Ambient logo glow */}
                    <div className="absolute inset-[-40%] bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />

                    <AnimatePresence mode="wait">
                        {!isPastHome && (
                            <motion.img
                                layoutId="main-logo"
                                src={logo}
                                alt="IVC Logo"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                                className="relative w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 drop-shadow-[0_0_60px_rgba(34,211,238,0.3)] z-10"
                            />
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Club name - massive Orbitron typography */}
                <motion.div
                    style={{ opacity: textOpacity }}
                    className="text-center"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-wider uppercase text-white mb-4"
                    >
                        <span className="text-cyan-400 text-glow-cyan">I</span>
                        <span className="text-white/90">VC</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="flex items-center justify-center gap-4 md:gap-6 mb-6"
                    >
                        <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-cyan-500/50" />
                        <span className="font-display text-[10px] md:text-xs tracking-[0.4em] text-cyan-400/80 uppercase">
                            Innovators & Visionaries Club
                        </span>
                        <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-cyan-500/50" />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 1 }}
                        className="font-display text-[10px] md:text-[13px] tracking-[0.3em] text-white/30 uppercase"
                    >
                        Vidyavardhaka College of Engineering, Mysuru
                    </motion.p>
                </motion.div>
            </motion.div>

            {/* Tagline Marquee Bar */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-24 md:bottom-32 left-0 right-0 border-y border-white/5 py-4 overflow-hidden z-10"
            >
                <div className="flex whitespace-nowrap animate-marquee">
                    {[...Array(2)].map((_, j) => (
                        <div key={j} className="flex items-center shrink-0">
                            {["IDEATE", "VISUALIZE", "CREATE", "INNOVATE", "BUILD", "LEAD"].map((word, i) => (
                                <span key={`${j}-${i}`} className="flex items-center">
                                    <span className={`font-display text-sm md:text-lg tracking-[0.3em] mx-8 md:mx-14 ${i % 2 === 0 ? 'text-cyan-400/60' : 'text-white/20'}`}>
                                        {word}
                                    </span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/30" />
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 md:bottom-12 flex flex-col items-center gap-2 z-10"
            >
                <span className="font-display text-[8px] text-white/20 uppercase tracking-[0.5em]">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-4 h-7 rounded-full border border-white/10 flex justify-center pt-1.5"
                >
                    <motion.div
                        animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-0.5 h-1.5 bg-cyan-400/50 rounded-full"
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Home;
