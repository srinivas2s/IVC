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
            <div className="absolute inset-0  opacity-40 pointer-events-none" />

            {/* Scan line - sweeps top to bottom continuously */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ top: ['-5%', '105%'] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-[1px] bg-cyan-400/15 shadow-[0_0_30px_6px_rgba(34,211,238,0.08)]"
                />
                {/* Second scan line - delayed, fainter */}
                <motion.div
                    animate={{ top: ['-5%', '105%'] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 2.5 }}
                    className="absolute left-0 right-0 h-[1px] bg-indigo-400/10 shadow-[0_0_20px_4px_rgba(99,102,241,0.05)]"
                />
            </div>

            {/* Floating geometric shapes - parallax with mouse */}
            {!isMobile && (
                <div className="absolute inset-0 pointer-events-none">
                    {/* Rotating square */}
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            y: [0, -20, 0],
                        }}
                        transition={{
                            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                        }}
                        style={{ x: mousePos.x * 0.3, y: mousePos.y * 0.3 }}
                        className="absolute top-[20%] left-[10%] w-14 h-14 border border-cyan-400/[0.08] rounded-md"
                    />

                    {/* Rotating circle */}
                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        style={{ x: mousePos.x * -0.2, y: mousePos.y * -0.2 }}
                        className="absolute top-[25%] right-[12%] w-10 h-10 border border-indigo-400/[0.06] rounded-full"
                    />

                    {/* Small diamond */}
                    <motion.div
                        animate={{ rotate: [0, 360], y: [0, -10, 0] }}
                        transition={{
                            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                            y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                        }}
                        style={{ x: mousePos.x * 0.15 }}
                        className="absolute bottom-[30%] left-[20%] w-6 h-6 border border-purple-400/[0.06] rotate-45"
                    />

                    {/* Dots */}
                    <motion.div
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        style={{ x: mousePos.x * 0.1 }}
                        className="absolute top-[40%] right-[25%] w-2 h-2 bg-cyan-400/20 rounded-full"
                    />
                    <motion.div
                        animate={{ opacity: [0.15, 0.4, 0.15] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        style={{ x: mousePos.x * -0.1 }}
                        className="absolute bottom-[35%] right-[8%] w-1.5 h-1.5 bg-indigo-400/15 rounded-full"
                    />

                    {/* Horizontal line */}
                    <motion.div
                        style={{ x: mousePos.x * 0.05 }}
                        className="absolute top-[55%] left-[5%] w-20 h-[1px] bg-gradient-to-r from-cyan-400/10 to-transparent"
                    />
                    <motion.div
                        style={{ x: mousePos.x * -0.05 }}
                        className="absolute top-[45%] right-[5%] w-16 h-[1px] bg-gradient-to-l from-indigo-400/10 to-transparent"
                    />
                </div>
            )}

            {/* ===== CENTRAL CONTENT ===== */}
            <motion.div
                style={{ y: logoY, scale: logoScale }}
                className="relative z-10 flex flex-col items-center px-4"
            >
                {/* 3D Logo with reactive tilt and glow rings */}
                <motion.div
                    animate={{
                        rotateX: mousePos.y * -0.12,
                        rotateY: mousePos.x * 0.12,
                    }}
                    transition={{ type: "spring", stiffness: 40, damping: 25 }}
                    className="relative mb-8 md:mb-12"
                    style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
                >
                    {/* Outer glow ring - slow rotation */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-50%] rounded-full border border-cyan-400/[0.05] pointer-events-none"
                    />
                    {/* Middle ring - reverse */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-35%] rounded-full border border-indigo-400/[0.04] pointer-events-none"
                    />
                    {/* Inner ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-20%] rounded-full border border-cyan-400/[0.06] pointer-events-none"
                    />

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
                        className="font-display text-[9px] md:text-[11px] tracking-[0.3em] text-white/20 uppercase"
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
                                    <span className={`font-display text-xs md:text-base tracking-[0.3em] mx-6 md:mx-12 ${i % 3 === 0 ? 'text-cyan-400/50' : 'text-white/15'}`}>
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
                <span className="font-display text-[7px] text-white/15 uppercase tracking-[0.5em]">Scroll</span>
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

