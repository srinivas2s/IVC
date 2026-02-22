import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Home = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isLoaded, setIsLoaded] = useState(false);

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
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative isolate min-h-screen flex items-center justify-center pt-12 md:pt-32 lg:pt-48 overflow-hidden"
        >
            <div className="relative z-10 w-full max-w-7xl px-4 flex flex-col items-center">
                {/* Magnetic Core with Refined Physics */}
                <motion.div
                    animate={{
                        x: mousePos.x,
                        y: mousePos.y,
                        rotateX: mousePos.y * -0.1, // Even subtler tilt
                        rotateY: mousePos.x * 0.1
                    }}
                    transition={{ type: "spring", stiffness: 35, damping: 35 }}
                    style={{ perspective: 1200 }}
                    className="relative flex flex-col items-center w-full"
                >
                    {/* Floating Branding Core */}
                    <div className="relative mb-8 md:mb-16 flex flex-col items-center">
                        <motion.img
                            layoutId="main-logo"
                            src={logo}
                            alt="IVC Logo"
                            className="relative w-32 h-32 md:w-64 md:h-64 drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] z-20"
                        />
                    </div>

                    {/* Unified Horizontal Branding Row (Restored Colors) */}
                    <div className="w-full flex justify-center pointer-events-none px-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-row items-center justify-center gap-3 md:gap-8 lg:gap-10"
                        >
                            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter italic uppercase whitespace-nowrap">
                                <span className="text-[#FEDE00] drop-shadow-[0_0_20px_rgba(254,222,0,0.3)]">Ideate</span>
                            </h1>

                            <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-white/20 blur-[1px] shrink-0" />

                            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter italic uppercase whitespace-nowrap">
                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">Visualize</span>
                            </h1>

                            <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-white/20 blur-[1px] shrink-0" />

                            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter italic uppercase whitespace-nowrap">
                                <span className="text-[#FF3B30] drop-shadow-[0_0_20px_rgba(255,59,48,0.3)]">Create</span>
                            </h1>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Enhanced Nexus Marquee (Matches Nav Card) */}
                <motion.div
                    initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-16 md:mt-24 w-full max-w-full px-0"
                >
                    <div className="liquid-glass rounded-xl md:rounded-3xl p-[1.5px] overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
                        <div className="relative py-4 md:py-7 px-8 md:px-12 flex flex-col items-center bg-[#05070a]/40 backdrop-blur-2xl overflow-hidden">
                            <div className="flex whitespace-nowrap">
                                <motion.div
                                    animate={{ x: ["0%", "-50%"] }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="flex shrink-0 items-center"
                                >
                                    {[
                                        "Where ideas meet execution and passion becomes impact.",
                                        "Building a community of learners, leaders, and changemakers.",
                                        "Learn. Build. Innovate. Together."
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
                                        "Where ideas meet execution and passion becomes impact.",
                                        "Building a community of learners, leaders, and changemakers.",
                                        "Learn. Build. Innovate. Together."
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
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
export default Home
