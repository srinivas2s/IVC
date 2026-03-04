import { motion } from 'framer-motion';

const InteractiveBackground = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#02040a]">
            {/* TechSolstice-style crosshair grid */}
            <div className="absolute inset-0 bg-cross-grid opacity-50" />

            {/* ===== CLOUD / NEBULA BLOBS - TechSolstice style ===== */}

            {/* Cloud 1 - Large cyan, top-left */}
            <motion.div
                animate={{
                    x: [0, 30, -15, 0],
                    y: [0, -20, 15, 0],
                    scale: [1, 1.05, 0.97, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-5%] left-[-5%] w-[55vw] h-[55vw] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(34, 211, 238, 0.12) 0%, rgba(34, 211, 238, 0.04) 40%, transparent 70%)',
                    filter: 'blur(80px)',
                }}
            />

            {/* Cloud 2 - Indigo/purple, bottom-right */}
            <motion.div
                animate={{
                    x: [0, -25, 20, 0],
                    y: [0, 20, -25, 0],
                    scale: [1, 0.95, 1.06, 1],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-10%] right-[-8%] w-[50vw] h-[50vw] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.03) 40%, transparent 70%)',
                    filter: 'blur(80px)',
                }}
            />

            {/* Cloud 3 - Cyan center glow */}
            <motion.div
                animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.08, 0.14, 0.08],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[30%] left-[25%] w-[45vw] h-[45vw] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, rgba(6, 182, 212, 0.05) 35%, transparent 65%)',
                    filter: 'blur(100px)',
                }}
            />

            {/* Cloud 4 - Deep blue, mid-left */}
            <motion.div
                animate={{
                    x: [0, 15, -10, 0],
                    y: [0, -15, 20, 0],
                }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[55%] left-[-5%] w-[40vw] h-[40vw] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 40%, transparent 70%)',
                    filter: 'blur(90px)',
                }}
            />

            {/* Cloud 5 - Teal accent, top-right */}
            <motion.div
                animate={{
                    x: [0, -20, 12, 0],
                    y: [0, 10, -18, 0],
                    scale: [1, 1.03, 0.98, 1],
                }}
                transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] right-[5%] w-[35vw] h-[35vw] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, rgba(20, 184, 166, 0.02) 40%, transparent 70%)',
                    filter: 'blur(80px)',
                }}
            />

            {/* Very subtle noise texture */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            }} />

            {/* Viewport edge glow */}
            <div className="fixed inset-0 pointer-events-none viewport-glow z-[10]" />
        </div>
    );
};

export default InteractiveBackground;
