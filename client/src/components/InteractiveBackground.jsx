import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const InteractiveBackground = ({ mode = 'dark' }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const isLight = mode === 'light';

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className={`fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-1000 ${isLight ? 'bg-[#f8f9ff]' : 'bg-[#05070a]'}`}>
            {/* Grain Texture Overlay */}
            <div className={`absolute inset-0 ${isLight ? 'opacity-[0.05]' : 'opacity-[0.03]'} pointer-events-none z-50 contrast-150 brightness-100`}
                style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}></div>

            {/* Mesh Gradients - Light Mode (Matching the image) */}
            {isLight && (
                <>
                    <div className="absolute top-[-10%] left-[-10%] w-[1200px] h-[1200px] bg-[#dde4ff] rounded-full blur-[140px] opacity-70 mix-blend-multiply animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-[#ffd7c4] rounded-full blur-[140px] opacity-70 mix-blend-multiply transition-transform duration-1000"></div>
                    <div className="absolute top-[20%] right-[10%] w-[700px] h-[700px] bg-[#f5e1ff] rounded-full blur-[120px] opacity-60 mix-blend-multiply"></div>
                </>
            )}

            {/* Dark Mode Layer (Static base) */}
            {!isLight && (
                <>
                    <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-ivc-primary/10 rounded-full blur-[160px] opacity-40 will-change-transform"></div>
                    <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-ivc-secondary/10 rounded-full blur-[160px] opacity-40 will-change-transform"></div>
                </>
            )}

            {/* Mouse Responsive Liquid Glow */}
            <motion.div
                animate={{
                    x: mousePosition.x - 400,
                    y: mousePosition.y - 400,
                }}
                transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 30,
                    mass: 2
                }}
                className={`absolute w-[800px] h-[800px] rounded-full blur-[120px] z-10 hidden md:block will-change-transform ${isLight ? 'bg-indigo-300/20 mix-blend-multiply' : 'bg-indigo-500/10 mix-blend-screen opacity-60'
                    }`}
            />

            {/* Grid Overlay */}
            <div
                className={`absolute inset-0 z-20 ${isLight ? 'opacity-[0.05]' : 'opacity-[0.1]'}`}
                style={{
                    backgroundImage: `radial-gradient(${isLight ? '#4f46e5' : 'rgba(99, 102, 241, 0.4)'} 0.5px, transparent 0.5px)`,
                    backgroundSize: '40px 40px'
                }}
            />
        </div>
    );
};

export default InteractiveBackground;
