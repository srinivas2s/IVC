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
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: { duration: 0.8, ease: "circIn" }
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
                                    <motion.img
                                        layoutId="main-logo"
                                        src={logo}
                                        alt="IVC Logo"
                                        transition={{
                                            type: "spring",
                                            stiffness: 45,
                                            damping: 20,
                                            mass: 1.2
                                        }}
                                        className="relative w-32 h-32 md:w-44 md:h-44 drop-shadow-liquid"
                                    />
                                </div>
                            </div>

                            {/* Loading content - Fades Out */}
                            <div className="space-y-8">
                                {/* Tagline with smooth reveal */}
                                <div className="relative flex flex-row items-center justify-center gap-4 md:gap-8 text-sm sm:text-lg md:text-3xl font-extrabold tracking-[0.15em] md:tracking-[0.4em] uppercase text-center px-4 max-w-[90vw] mx-auto">
                                    {words.map((word, index) => (
                                        <div key={word.id} className="relative flex items-center">
                                            <motion.span
                                                layoutId={word.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 50,
                                                    damping: 18,
                                                    delay: 0.5 + (index * 0.2)
                                                }}
                                                className={`relative z-10 ${word.color}`}
                                            >
                                                {word.text}
                                            </motion.span>
                                        </div>
                                    ))}
                                </div>

                                {/* Subtitle */}
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 2, duration: 1 }}
                                    className="text-[10px] md:text-xs tracking-[0.3em] text-gray-500/60 uppercase font-medium"
                                >
                                    Innovating the Future
                                </motion.p>

                                {/* Loading progress indicator */}
                                <div className="relative h-[1px] max-w-xs mx-auto overflow-hidden">
                                    <motion.div
                                        initial={{ x: '-100%' }}
                                        animate={{ x: '100%' }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 0.5
                                        }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-ivc-primary to-transparent"
                                    />
                                    <div className="absolute inset-0 bg-white/10" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
