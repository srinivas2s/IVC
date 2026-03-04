import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const Home = ({ isPastHome }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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

    const handleMouseMove = (e) => {
        if (isMobile) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        setMousePos({ x, y });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        >
            {/* ===== BACKGROUND EFFECTS ===== */}

            {/* Ambient radial gradients - slowly moving */}
            <motion.div
                style={{ scale: bgScale }}
                className="absolute inset-0 pointer-events-none"
            >
                <motion.div
                    animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.95, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-20%] left-[-15%] w-[70vw] h-[70vw] bg-[radial-gradient(circle,rgba(34,211,238,0.06)_0%,transparent_70%)] blur-[40px]"
                />
                <motion.div
                    animate={{ x: [0, -30, 25, 0], y: [0, 25, -35, 0], scale: [1, 0.9, 1.1, 1] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-20%] right-[-15%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(99,102,241,0.06)_0%,transparent_70%)] blur-[40px]"
                />
                {/* Center spotlight */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(34,211,238,0.025)_0%,transparent_50%)]" />
            </motion.div>

            {/* Blueprint grid - subtle */}
            <div className="absolute inset-0 opacity-40 pointer-events-none" />

            {/* ===== CENTRAL CONTENT ===== */}
            <motion.div
                style={{ y: logoY, scale: logoScale }}
                className="relative z-10 flex flex-col items-center px-4"
            >
                {/* 3D Logo with reactive tilt */}
                <motion.div
                    animate={{
                        rotateX: mousePos.y * -0.12,
                        rotateY: mousePos.x * 0.12,
                    }}
                    transition={{ type: "spring", stiffness: 40, damping: 25 }}
                    className="relative mb-8 md:mb-12"
                    style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
                >
                    {/* Logo ambient glow */}
                    <motion.div
                        animate={{
                            x: mousePos.x * 1.5,
                            y: mousePos.y * 1.5,
                        }}
                        className="absolute inset-[-40%] bg-[radial-gradient(circle,rgba(34,211,238,0.12)_0%,transparent_70%)] blur-[60px] rounded-full pointer-events-none"
                    />

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
                                className="relative w-36 h-36 md:w-52 md:h-52 lg:w-60 lg:h-60 drop-shadow-[0_0_80px_rgba(34,211,238,0.25)] z-10"
                                style={{ transform: 'translateZ(60px)' }}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Club name - massive Orbitron typography */}
                <motion.div style={{ opacity: textOpacity }} className="text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-wider uppercase text-white mb-4"
                    >
                        <span className="text-cyan-400 text-glow-cyan">I</span>
                        <span className="text-white/90">V</span>
                        <span className="text-white/90">C</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="flex items-center justify-center gap-4 md:gap-6 mb-6"
                    >
                        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-cyan-400/40" />
                        <span className="font-display text-[9px] md:text-[11px] tracking-[0.4em] text-cyan-400/70 uppercase">
                            Innovators & Visionaries Club
                        </span>
                        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-cyan-400/40" />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="font-display text-[9px] md:text-[11px] tracking-[0.3em] text-white/40 uppercase"
                    >
                        Vidyavardhaka College of Engineering, Mysuru
                    </motion.p>
                </motion.div>
            </motion.div>

            {/* Marquee tagline bar - bottom */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-20 md:bottom-28 left-0 right-0 border-y border-white/[0.04] py-4 overflow-hidden z-10"
            >
                <div className="flex whitespace-nowrap animate-marquee">
                    {[...Array(2)].map((_, j) => (
                        <div key={j} className="flex items-center shrink-0">
                            {["IDEATE", "VISUALIZE", "CREATE", "INNOVATE", "BUILD", "LEAD", "COLLABORATE"].map((word, i) => (
                                <span key={`${j}-${i}`} className="flex items-center">
                                    <span className={`font-display text-xs md:text-base tracking-[0.3em] mx-6 md:mx-12 ${i % 3 === 0 ? 'text-cyan-400/50' : 'text-white/30'}`}>
                                        {word}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-cyan-400/20" />
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
                className="absolute bottom-6 md:bottom-10 flex flex-col items-center gap-2 z-10"
            >
                <span className="font-display text-[7px] text-white/30 uppercase tracking-[0.5em]">Scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-4 h-6 rounded-full border border-white/[0.08] flex justify-center pt-1"
                >
                    <motion.div
                        animate={{ y: [0, 4, 0], opacity: [0.6, 0.15, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-0.5 h-1.5 bg-cyan-400/40 rounded-full"
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Home;

