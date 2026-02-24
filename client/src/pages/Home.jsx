import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import logo from '../assets/logo.png';

const Home = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Scroll-triggered scaling and perspective shifts
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const zTranslate = useTransform(scrollYProgress, [0, 0.5], [0, 200]);

    useEffect(() => {
        // Delay the entrance of background effects to allow logo to "sit" first
        const timer = setTimeout(() => setIsLoaded(true), 1200);

        const handleOrientation = (e) => {
            if (e.beta && e.gamma) {
                // Account for natural 45-degree phone holding angle
                // Gamma: Left/Right tilt (-90 to 90)
                // Beta: Front/Back tilt (-180 to 180, typically 45 for handheld)
                const x = (e.gamma / 30) * 15;
                const y = ((e.beta - 45) / 30) * 15;
                setMousePos({ x, y });
            }
        };

        const requestPermission = async () => {
            if (typeof DeviceOrientationEvent !== 'undefined' &&
                typeof DeviceOrientationEvent.requestPermission === 'function') {
                try {
                    const permission = await DeviceOrientationEvent.requestPermission();
                    if (permission === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation);
                    }
                } catch (error) {
                    console.error('Gyroscope permission denied');
                }
            } else {
                window.addEventListener('deviceorientation', handleOrientation);
            }
        };

        requestPermission();
        return () => {
            clearTimeout(timer);
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, []);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20;
        const y = (clientY / window.innerHeight - 0.5) * 20;
        setMousePos({ x, y });
    };

    const handleTouchMove = (e) => {
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
            style={{ perspective: "1500px" }}
        >
            {/* 3D Space - Environment Layer */}
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

                {/* Milky Way Particles - Enhanced Multi-Layer */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            x: mousePos.x * (i % 8 + 1) * -0.3,
                            y: mousePos.y * (i % 8 + 1) * -0.3,
                            opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{
                            opacity: { duration: Math.random() * 3 + 2, repeat: Infinity },
                            type: "spring",
                            stiffness: 15,
                            damping: 25
                        }}
                        className={`absolute rounded-full blur-[1px] ${i % 3 === 0 ? 'bg-ivc-primary/40' : i % 3 === 1 ? 'bg-ivc-secondary/40' : 'bg-white/40'}`}
                        style={{
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            transform: `translateZ(${-200 - (i * 15)}px)`
                        }}
                    />
                ))}
            </div>

            <motion.div
                style={{
                    scale,
                    opacity,
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
                        <motion.img
                            layoutId="main-logo"
                            src={logo}
                            alt="IVC Logo"
                            className="relative w-32 h-32 md:w-64 md:h-64 drop-shadow-[0_45px_100px_rgba(0,0,0,0.9)] z-20"
                            style={{ transform: "translateZ(40px)" }}
                        />

                        {/* Dynamic Rim Light / Glint */}
                        <motion.div
                            animate={{
                                x: mousePos.x * 2,
                                y: mousePos.y * 2,
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            className="absolute inset-[-20%] bg-gradient-to-tr from-white/10 to-transparent blur-3xl rounded-full z-10 pointer-events-none"
                        />
                    </div>

                    {/* Unified Horizontal Branding Row with Specular Shine */}
                    <div className="w-full flex justify-center pointer-events-none px-4" style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-row items-center justify-center gap-3 md:gap-8 lg:gap-10 relative"
                        >
                            {/* Specular Light Sweep */}
                            <motion.div
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 z-0"
                            />

                            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter italic uppercase whitespace-nowrap group">
                                <span className="text-[#FEDE00] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative z-10">Ideate</span>
                            </h1>

                            <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-white/20 blur-[1px] shrink-0" />

                            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter italic uppercase whitespace-nowrap">
                                <span className="text-white drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative z-10">Visualize</span>
                            </h1>

                            <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-white/20 blur-[1px] shrink-0" />

                            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter italic uppercase whitespace-nowrap">
                                <span className="text-[#FF3B30] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative z-10">Create</span>
                            </h1>
                        </motion.div>
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
