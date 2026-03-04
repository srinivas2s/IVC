import { motion } from 'framer-motion';

const InteractiveBackground = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#050a15]">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#0c1525_0%,#050a15_60%,#030510_100%)]" />

            {/* Cross/dot grid - like TechSolstice */}
            <div className="absolute inset-0 bg-cross-grid opacity-50" />

            {/* Ambient nebula blob - top-left cyan */}
            <motion.div
                animate={{
                    x: [0, 60, -30, 0],
                    y: [0, -40, 30, 0],
                    scale: [1, 1.15, 0.9, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-15%] left-[-10%] w-[45vw] h-[45vw] bg-[radial-gradient(circle,rgba(34,211,238,0.04)_0%,transparent_70%)] blur-[60px]"
            />

            {/* Ambient nebula blob - bottom-right indigo */}
            <motion.div
                animate={{
                    x: [0, -40, 50, 0],
                    y: [0, 30, -40, 0],
                    scale: [1, 0.9, 1.12, 1],
                }}
                transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-15%] right-[-10%] w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(99,102,241,0.035)_0%,transparent_70%)] blur-[60px]"
            />

            {/* Center subtle spotlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[radial-gradient(circle,rgba(34,211,238,0.012)_0%,transparent_50%)]" />

            {/* Subtle film grain noise */}
            <div className="absolute inset-0 opacity-[0.012]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            }} />

            {/* Viewport edge glow - TechSolstice style inset glow */}
            <div className="fixed inset-0 pointer-events-none viewport-glow z-[1]" />
        </div>
    );
};

export default InteractiveBackground;
