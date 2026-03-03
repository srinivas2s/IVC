import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import InteractiveDotGrid from './InteractiveDotGrid';

const InteractiveBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleInput = (clientX, clientY) => {
            setMousePosition({ x: clientX, y: clientY });
        };

        const handleMouseMove = (e) => handleInput(e.clientX, e.clientY);
        const handleTouchMove = (e) => {
            if (e.touches[0]) handleInput(e.touches[0].clientX, e.touches[0].clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#020408]">
            {/* Deep Space Nebula Layers with Parallax WOW Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden scale-110">
                {/* Cyan Nebula - Medium Parallax */}
                <motion.div
                    animate={{
                        x: mousePosition.x * 0.04,
                        y: mousePosition.y * 0.04,
                    }}
                    transition={{ type: "smooth", duration: 2 }}
                    className="absolute top-[-10%] left-[-10%] w-[100%] h-[100%] bg-cyan-500/5 rounded-full blur-[130px] mix-blend-screen opacity-40 animate-nebula"
                />

                {/* Purple Nebula - Opposite Parallax */}
                <motion.div
                    animate={{
                        x: mousePosition.x * -0.05,
                        y: mousePosition.y * -0.05,
                    }}
                    transition={{ type: "smooth", duration: 2.5 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[90%] h-[90%] bg-purple-600/5 rounded-full blur-[150px] mix-blend-screen opacity-30 animate-nebula-reverse"
                />

                {/* Deep Indigo Atmosphere - Slow Parallax */}
                <motion.div
                    animate={{
                        x: mousePosition.x * 0.02,
                        y: mousePosition.y * 0.02,
                    }}
                    transition={{ type: "smooth", duration: 3 }}
                    className="absolute top-[20%] left-[10%] w-[80%] h-[80%] bg-indigo-900/10 rounded-full blur-[170px] mix-blend-plus-lighter opacity-25 animate-nebula"
                />

                {/* Ambient Gold Glow - Very Slow Parallax */}
                <motion.div
                    animate={{
                        x: mousePosition.x * -0.01,
                        y: mousePosition.y * -0.01,
                    }}
                    transition={{ type: "smooth", duration: 4 }}
                    className="absolute bottom-[20%] left-[30%] w-[60%] h-[60%] bg-[#FEDE00]/5 rounded-full blur-[140px] mix-blend-screen opacity-10 animate-pulse-slow"
                />

                {/* Glinting Deep Space Stars */}
                <div className="absolute inset-0 overflow-hidden opacity-40">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: (i * 33) % 100 + "%",
                                y: (i * 17) % 100 + "%",
                                opacity: 0.1,
                                scale: 0.5
                            }}
                            animate={{
                                opacity: [0.1, 0.4, 0.1],
                                scale: [1, 1.3, 1],
                            }}
                            transition={{
                                duration: 3 + (i % 5),
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.2
                            }}
                            className="absolute w-[2px] h-[2px] bg-white rounded-full blur-[0.5px]"
                            style={{
                                left: `${(i * 37) % 100}%`,
                                top: `${(i * 23) % 100}%`
                            }}
                        />
                    ))}
                </div>
            </div>

            <InteractiveDotGrid
                cyanColor="rgba(34, 211, 238, 0.9)"
                purpleColor="rgba(192, 132, 252, 0.9)"
            />

            <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] opacity-10 animate-float" />

            {/* Response Highlight - Matches the website gradient */}
            <motion.div
                animate={{
                    x: mousePosition.x - 400,
                    y: mousePosition.y - 400,
                }}
                transition={{
                    type: "spring",
                    stiffness: 40,
                    damping: 40,
                    mass: 1.5
                }}
                className="absolute w-[800px] h-[800px] bg-gradient-to-br from-cyan-400/10 to-purple-500/10 rounded-full blur-[140px] mix-blend-screen opacity-60 z-10 will-change-transform pointer-events-none"
            />

            {/* Noise Texture Overlay */}
            <div
                className="absolute inset-0 z-30 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />


        </div>
    );
};

export default InteractiveBackground;
