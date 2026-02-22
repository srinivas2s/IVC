import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Home = () => {

    return (
        <div className="relative isolate min-h-screen flex items-center justify-center pt-15 sm:pt-20">
            <div className="relative z-10 w-full flex justify-center">
                <div className="relative w-[95%] max-w-7xl py-32 px-10 md:py-16 md:px-24 group">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="liquid-glass absolute inset-0 rounded-2xl overflow-hidden"
                    >


                        <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-ivc-primary/10 blur-[100px] rounded-full"></div>
                    </motion.div>

                    <div className="relative z-10 text-center">
                        <div className="flex flex-col items-center mb-10">
                            <div className="relative mb-6">
                                <motion.img
                                    layoutId="main-logo"
                                    src={logo}
                                    alt="IVC Logo"
                                    className="relative w-32 h-32 md:w-44 md:h-44 drop-shadow-liquid"
                                />
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{
                                    delay: 0.6,
                                    duration: 1.2,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                className="flex items-center gap-3 sm:gap-5 font-black text-xl sm:text-3xl md:text-4xl tracking-tight uppercase"
                            >
                                <span className="text-[#FEDE00]">Ideate</span>
                                <span className="text-[#4A4A4A]">Visualize</span>
                                <span className="text-[#FF3B30]">Create</span>
                            </motion.div>
                        </div>



                        <motion.div
                            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 1.5, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <p className="text-lg md:text-xl font-bold tracking-tight text-white/80 max-w-xl mx-auto leading-relaxed">
                                Empower <span className="text-ivc-secondary text-glow">Students</span> through innovation, collaboration, creativity.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home
