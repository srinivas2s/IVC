import { motion } from 'framer-motion';

const InteractiveBackground = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#060b18]">
            {/* Base gradient - dark navy blue with subtle depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#0d1525_0%,#060b18_60%,#030510_100%)]" />

            {/* Blueprint grid overlay */}
            <div className="absolute inset-0 bg-blueprint opacity-60" />

            {/* Ambient nebula glow - top left */}
            <motion.div
                animate={{
                    x: [0, 30, -20, 0],
                    y: [0, -30, 20, 0],
                    scale: [1, 1.1, 0.95, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-500/[0.03] rounded-full blur-[150px]"
            />

            {/* Ambient nebula glow - bottom right */}
            <motion.div
                animate={{
                    x: [0, -20, 30, 0],
                    y: [0, 20, -30, 0],
                    scale: [1, 0.95, 1.1, 1],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-indigo-500/[0.03] rounded-full blur-[150px]"
            />

            {/* Subtle center glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(34,211,238,0.015)_0%,transparent_70%)]" />

            {/* Very subtle noise texture */}
            <div className="absolute inset-0 opacity-[0.015]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
            }} />
        </div>
    );
};

export default InteractiveBackground;
