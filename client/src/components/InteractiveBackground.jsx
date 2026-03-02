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
            {/* Ambient Base Glows - Reduced blur on mobile */}
            <div className={`absolute top-[-20%] left-[-10%] w-[1200px] h-[1200px] bg-ivc-primary/10 rounded-full ${isMobile ? 'blur-[100px] opacity-20' : 'blur-[180px] opacity-40'} will-change-transform animate-pulse-slow`}></div>
            <div className={`absolute bottom-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-ivc-secondary/15 rounded-full ${isMobile ? 'blur-[100px] opacity-15' : 'blur-[180px] opacity-30'} will-change-transform`}></div>

            <InteractiveDotGrid
                cyanColor="rgba(34, 211, 238, 0.9)"
                purpleColor="rgba(192, 132, 252, 0.9)"
            />

            <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] opacity-20 will-change-transform animate-float"></div>

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
                className="absolute w-[800px] h-[800px] bg-gradient-to-br from-cyan-400/10 to-purple-500/10 rounded-full blur-[140px] mix-blend-screen opacity-60 z-10 will-change-transform"
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
