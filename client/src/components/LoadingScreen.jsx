import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const LoadingScreen = () => {
    const words = [
        { text: "Ideate", id: "word-ideate", color: "text-[#FEDE00]" },
        { text: "Visualize", id: "word-visualize", color: "text-white" },
        { text: "Create", id: "word-create", color: "text-[#FF3B30]" }
    ];

    return (
        <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{
                opacity: 0,
                pointerEvents: 'none',
                transition: { duration: 0.3, ease: "easeOut" }
            }}
            className="fixed inset-0 z-[100] bg-[#020408]"
        >
            <div className="relative isolate min-h-screen flex items-center justify-center px-4 py-20">
                <div className="mx-auto max-w-7xl relative z-10 w-full h-full flex flex-col justify-center">
                    {/* Glass Container Wrapper */}
                    <div className="relative max-w-5xl mx-auto w-full p-8 md:p-16 lg:p-24 group min-h-[70vh] flex flex-col justify-center">
                        <div className="relative z-10 text-center">
                            <div className="flex justify-center mb-12">
                                <div className="relative">
                                    {/* Shared Logo Bloom */}
                                    <motion.div
                                        layoutId="logo-glow"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{
                                            opacity: [0.4, 0.7, 0.4],
                                            scale: [0.9, 1.1, 0.9]
                                        }}
                                        exit={{ opacity: 0, scale: 2, filter: "blur(60px)" }}
                                        transition={{
                                            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                                            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                            layout: { type: "spring", stiffness: 45, damping: 20, mass: 1.2 }
                                        }}
                                        className="absolute inset-[-40%] bg-gradient-to-tr from-cyan-500/30 to-purple-500/30 blur-3xl rounded-full z-0"
                                    />
                                    <motion.img
                                        layoutId="main-logo"
                                        src={logo}
                                        alt="IVC Logo"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ scale: 1.2, opacity: 0, filter: "blur(15px)" }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 45,
                                            damping: 20,
                                            mass: 1.2
                                        }}
                                        className="relative w-32 h-32 md:w-44 md:h-44 drop-shadow-liquid z-10"
                                    />
                                </div>
                            </div>

                            {/* Loading content - Fades Out */}
                            <div className="space-y-8">
                                {/* Tagline with smooth reveal */}
                                <div className="relative flex flex-row items-center justify-center gap-6 md:gap-12 px-4 max-w-[95vw] mx-auto">
                                    {words.map((word, index) => (
                                        <motion.span
                                            key={word.id}
                                            layoutId={word.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 50,
                                                damping: 18,
                                                delay: 0.5 + (index * 0.2)
                                            }}
                                            className={`text-2xl sm:text-4xl md:text-6xl font-black italic uppercase tracking-tighter whitespace-nowrap ${word.color} drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]`}
                                        >
                                            {word.text}
                                        </motion.span>
                                    ))}
                                </div>

                                {/* Subtitle */}
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.5, duration: 1 }}
                                    className="text-[10px] md:text-xs tracking-[0.4em] text-gray-400 font-bold uppercase"
                                >
                                    Innovating the Future
                                </motion.p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen; 