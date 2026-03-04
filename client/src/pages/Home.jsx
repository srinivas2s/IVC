import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const Home = ({ isPastHome }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Create a smooth spring for the scroll progress to avoid jitter
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Scroll-triggered scaling and perspective shifts using the smooth spring
    const scale = useTransform(smoothProgress, [0, 0.5], [1, 1.1]);
    const zTranslate = useTransform(smoothProgress, [0, 0.5], [0, 200]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Delay the entrance of background effects to allow logo to "sit" first
        const timer = setTimeout(() => setIsLoaded(true), 1200);

        const handleOrientation = (e) => {
            if (e.beta && e.gamma && !isMobile) {
                const x = (e.gamma / 30) * 15;
                const y = ((e.beta - 45) / 30) * 15;
                setMousePos({ x, y });
            }
        };

        const requestPermission = async () => {
            if (!isMobile && typeof DeviceOrientationEvent !== 'undefined' &&
                typeof DeviceOrientationEvent.requestPermission === 'function') {
                try {
                    const permission = await DeviceOrientationEvent.requestPermission();
                    if (permission === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation);
                    }
                } catch (error) {
                    console.error('Gyroscope permission denied');
                }
            } else if (!isMobile) {
                window.addEventListener('deviceorientation', handleOrientation);
            }
        };

        requestPermission();
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, [isMobile]);

    const handleMouseMove = (e) => {
        if (isMobile) return;
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20;
        const y = (clientY / window.innerHeight - 0.5) * 20;
        setMousePos({ x, y });
    };

    const handleTouchMove = (e) => {
        // Only track touch for effects if we really want to, but keep it light
        if (isMobile) return;
        const touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth - 0.5) * 15;
        const y = (touch.clientY / window.innerHeight - 0.5) * 15;
        setMousePos({ x, y });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative isolate min-h-screen flex items-center justify-center pt-12 md:pt-32 lg:pt-48 overflow-visible bg-transparent"
            style={{ perspective: isMobile ? "none" : "1500px" }}
        >
            {/* 3D Space - Environment Layer - Disabled on mobile for performance */}
            {!isMobile && (
                <div className="fixed inset-0 z-0 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
                    {/* Dynamic Space Grid - Warps with tilt */}
                    <motion.div
                        animate={{
                            rotateX: 60 + (mousePos.y * 0.2),
                            rotateZ: mousePos.x * 0.1,
                            y: mousePos.y * 5
                        }}
                        className="absolute bottom-[-20%] left-[-50%] w-[200%] h-[100%] opacity-10"
                        style={{
                            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                            backgroundSize: '80px 80px',
                            transform: "rotateX(70deg)",
                            maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
                        }}
                    />

                    {/* Particles removed as per user request */}
                </div>
            )}

            <motion.div
                style={{
                    scale,
                    z: zTranslate,
                    transformStyle: "preserve-3d"
                }}
                className="relative z-10 w-full max-w-7xl px-4 flex flex-col items-center"
            >
                {/* Magnetic Core with Refined Physics */}
                <motion.div
                    animate={{
                        rotateX: mousePos.y * -0.2,
                        rotateY: mousePos.x * 0.2,
                    }}
                    transition={{ type: "spring", stiffness: 35, damping: 35 }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="relative flex flex-col items-center w-full"
                >
                    {/* Floating Branding Core (Front Layer) */}
                    <div className="relative mb-8 md:mb-16 flex flex-col items-center" style={{ transform: "translateZ(120px)", transformStyle: "preserve-3d" }}>
                        <AnimatePresence mode="wait">
                            {!isPastHome && (
                                <motion.img
                                    layoutId="main-logo"
                                    src={logo}
                                    alt="IVC Logo"
                                    initial={{ opacity: 1 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 45,
                                        damping: 20,
                                        mass: 1.2
                                    }}
                                    className="relative w-32 h-32 md:w-64 md:h-64 drop-shadow-[0_45px_100px_rgba(0,0,0,0.9)] z-20"
                                    style={{ transform: "translateZ(40px)" }}
                                />
                            )}
                        </AnimatePresence>

                        {/* Shared Logo Bloom Transition */}
                        <motion.div
                            layoutId="logo-glow"
                            animate={{
                                x: mousePos.x * 2,
                                y: mousePos.y * 2,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 45,
                                damping: 20,
                                mass: 1.2
                            }}
                            className="absolute inset-[-40%] bg-gradient-to-tr from-cyan-500/15 to-purple-500/15 blur-3xl rounded-full z-10 pointer-events-none"
                        />
                    </div>

                    {/* Unified Horizontal Branding Row with Specular Shine */}
                    <div className="w-full flex justify-center pointer-events-none px-4" style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}>
                        <div
                            className="flex flex-row items-center justify-center gap-3 md:gap-8 lg:gap-10 relative"
                        >
                            {/* Specular Light Sweep */}
                            <motion.div
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 z-0"
                            />

                            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter italic uppercase whitespace-nowrap group">
                                <motion.span
                                    layoutId="word-ideate"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 50,
                                        damping: 18,
                                        delay: 0.5
                                    }}
                                    className="text-[#FEDE00] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative z-10 block"
                                >
                                    Ideate
                                </motion.span>
                            </h1>

                            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter italic uppercase whitespace-nowrap">
                                <motion.span
                                    layoutId="word-visualize"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 50,
                                        damping: 18,
                                        delay: 0.6
                                    }}
                                    className="text-white drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative z-10 block"
                                >
                                    Visualize
                                </motion.span>
                            </h1>

                            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter italic uppercase whitespace-nowrap">
                                <motion.span
                                    layoutId="word-create"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 50,
                                        damping: 18,
                                        delay: 0.7
                                    }}
                                    className="text-[#FF3B30] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative z-10 block"
                                >
                                    Create
                                </motion.span>
                            </h1>
                        </div>
                    </div>
                </motion.div>

                {/* 3D Floating Hero Bar - The Marquee Container */}
                <motion.div
                    initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-16 md:mt-24 w-full max-w-full px-0 relative group"
                    style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
                >
                    {/* 3D Floating elements near the bar */}
                    <div className="absolute -top-10 -left-10 w-20 h-20 bg-ivc-primary/20 blur-2xl rounded-full z-0 animate-pulse" style={{ transform: "translateZ(30px)" }}></div>
                    <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-ivc-secondary/20 blur-2xl rounded-full z-0 animate-pulse" style={{ transform: "translateZ(40px)" }}></div>

                    <div className="liquid-glass rounded-xl md:rounded-3xl p-[1.5px] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.8)] border border-white/5 relative" style={{ transformStyle: "preserve-3d" }}>
                        <div className="relative py-4 md:py-7 px-8 md:px-12 flex flex-col items-center bg-[#05070a]/60 backdrop-blur-3xl overflow-hidden" style={{ transform: "translateZ(10px)" }}>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="flex whitespace-nowrap">
                                <motion.div
                                    animate={{ x: ["0%", "-50%"] }}
                                    transition={{
                                        duration: 25,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="flex shrink-0 items-center"
                                >
                                    {[
                                        "Where ideas meet execution and passion becomes impact",
                                        "Building a community of learners leaders and changemakers",
                                        "Learn. Build Innovate Together"
                                    ].map((text, i) => (
                                        <div key={i} className="flex items-center">
                                            <span className="text-xs md:text-sm font-black tracking-[0.4em] text-white uppercase mx-10 md:mx-16">
                                                {text}
                                            </span>
                                            <div className="w-1.5 h-1.5 rounded-full bg-ivc-primary/50 mx-4" />
                                        </div>
                                    ))}
                                    {/* Duplicate for seamless loop */}
                                    {[
                                        "Where ideas meet execution and passion becomes impact",
                                        "Building a community of learners leaders and changemakers",
                                        "Learn. Build Innovate Together"
                                    ].map((text, i) => (
                                        <div key={`dup-${i}`} className="flex items-center">
                                            <span className="text-xs md:text-sm font-black tracking-[0.4em] text-white uppercase mx-10 md:mx-16">
                                                {text}
                                            </span>
                                            <div className="w-1.5 h-1.5 rounded-full bg-ivc-primary/50 mx-4" />
                                        </div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        {/* 3D Bevel/Edge Effect for the Hero Bar */}
                        <div className="absolute inset-0 border-r-[4px] border-b-[4px] border-white/5 pointer-events-none rounded-xl md:rounded-3xl"></div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};
export default Home
