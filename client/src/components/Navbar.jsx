import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ArrowLeft } from 'lucide-react';
import logo from '../assets/logo.png';
import vvceLogo from '../assets/vvce-logo.png';

const links = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Team', id: 'team' },
    { name: 'Events', id: 'events' },
    { name: 'Domains', id: 'domains' },
    { name: 'Projects', id: 'projects' },
    { name: 'Achievements', id: 'achievements' },
];

const Navbar = ({ isPastHome }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
            setActiveSection(id);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = links.map(link => document.getElementById(link.id));
            const scrollPosition = window.scrollY + 100; // Offset for navbar

            for (const section of sections) {
                if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                    setActiveSection(section.id);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed z-[100] transition-all duration-700 ease-[0.16,1,0.3,1] ${isPastHome ? 'top-6 right-6 left-auto translate-x-0 w-auto' : 'top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl'}`}>
            <AnimatePresence mode="wait">
                {!isPastHome ? (
                    <motion.div
                        key="full-nav"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`
                            relative bg-[#020408]/40 backdrop-blur-[20px] border border-white/10 rounded-[24px] items-center justify-between px-4 sm:px-10 py-3 sm:py-5 flex-nowrap shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]
                            ${isOpen ? 'hidden' : 'flex'}
                            group/nav
                        `}
                    >
                        {/* Subtle Bloom behind the bar */}
                        <div className="absolute inset-x-10 inset-y-0 bg-ivc-primary/5 blur-3xl opacity-0 group-hover/nav:opacity-100 transition-opacity duration-1000 -z-10" />

                        <div className="flex items-center gap-2 sm:gap-6 flex-1 min-w-0">
                            <div className="flex items-center select-none min-w-0">
                                <div className="overflow-hidden shrink-0">
                                    <motion.span
                                        initial={{ x: '100%', opacity: 0, filter: 'blur(10px)' }}
                                        animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                                        transition={{
                                            duration: 1.2,
                                            ease: [0.16, 1, 0.3, 1],
                                            delay: 0.3
                                        }}
                                        className="text-white font-light text-xl sm:text-3xl tracking-tighter block mr-2 sm:mr-6"
                                    >
                                        inunity
                                    </motion.span>
                                </div>

                                <motion.div
                                    initial={{ scaleY: 0, opacity: 0 }}
                                    animate={{ scaleY: 1, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="w-[1px] h-8 sm:h-14 bg-white/20 shrink-0"
                                />

                                <div className="flex items-center gap-2 sm:gap-5 ml-2 sm:ml-6 min-w-0 overflow-hidden">
                                    <motion.img
                                        src={vvceLogo}
                                        alt="VVCE Logo"
                                        initial={{ x: '-100%', opacity: 0, filter: 'blur(10px)', scale: 0.8 }}
                                        animate={{ x: 0, opacity: 1, filter: 'blur(0px)', scale: 1 }}
                                        transition={{
                                            duration: 1.2,
                                            ease: [0.16, 1, 0.3, 1],
                                            delay: 0.4
                                        }}
                                        className="h-10 sm:h-20 w-auto brightness-110 shrink-0"
                                    />
                                    <motion.div
                                        initial={{ x: '-30%', opacity: 0, filter: 'blur(8px)' }}
                                        animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                                        transition={{
                                            duration: 1.3,
                                            ease: [0.16, 1, 0.3, 1],
                                            delay: 0.5
                                        }}
                                        className="flex flex-col justify-center select-none min-w-0 overflow-hidden"
                                    >
                                        <span className="text-[6px] sm:text-[11px] text-white/70 leading-tight uppercase tracking-[0.12em] font-medium truncate mb-0.5">Vidyavardhaka Sangha ®, Mysore</span>
                                        <span className="text-[10px] sm:text-[21px] text-white font-bold leading-tight tracking-tight truncate mb-0.5">Vidyavardhaka College of Engineering</span>
                                        <span className="text-[6px] sm:text-[13px] text-white/50 leading-tight font-medium truncate">Autonomous institute affiliated to VTU, Belagavi</span>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        <div className="flex shrink-0">
                            <button
                                onClick={() => setIsOpen(true)}
                                className="inline-flex flex-col items-center justify-center p-2 w-10 h-10 sm:w-14 sm:h-14 space-y-1.5 sm:space-y-2.5 text-ivc-text rounded-2xl hover:bg-white/5 transition-all group/btn active:scale-90"
                            >
                                <span className="sr-only">Open main menu</span>
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{
                                            width: i === 1 ? (window.innerWidth < 640 ? 18 : 24) : (window.innerWidth < 640 ? 12 : 18),
                                            opacity: 1
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.6 + (i * 0.1),
                                            ease: [0.16, 1, 0.3, 1]
                                        }}
                                        className="h-[2px] sm:h-[3px] bg-white rounded-full group-hover/btn:bg-ivc-primary transition-colors"
                                    />
                                ))}
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        key="compact-nav"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => setIsOpen(true)}
                        className={`
                            p-3 sm:p-5 bg-[#020408]/60 backdrop-blur-[24px] border border-white/10 rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-center group/btn active:scale-95 transition-all cursor-pointer
                            ${isOpen ? 'hidden' : 'flex'}
                        `}
                    >
                        <div className="flex flex-col gap-1.5 items-center">
                            <div className="w-6 h-[2px] bg-white rounded-full group-hover/btn:bg-ivc-primary transition-colors"></div>
                            <div className="w-4 h-[2px] bg-white rounded-full group-hover/btn:bg-ivc-primary transition-colors ml-2"></div>
                            <div className="w-6 h-[2px] bg-white rounded-full group-hover/btn:bg-ivc-primary transition-colors"></div>
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Menu Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-[55]"
                    />
                )}
            </AnimatePresence>

            {/* Menu Sidebar (Right Side) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 40 }}
                        className="fixed top-6 right-6 w-[280px] z-[60]"
                    >
                        <div className="w-full relative group">
                            {/* Glass Panel */}
                            <div
                                className="w-full bg-white/[0.01] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] relative flex flex-col border border-white/10 rounded-[32px] overflow-hidden transform-gpu"
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                <div
                                    className="absolute inset-0 backdrop-blur-3xl bg-black/10 -z-10"
                                    style={{ willChange: 'backdrop-filter' }}
                                />

                                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

                                {/* Close Button */}
                                <div className="flex justify-end mb-6 relative z-10">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 text-white/50 hover:text-white transition-colors"
                                    >
                                        <ArrowLeft size={24} className="rotate-180" />
                                    </button>
                                </div>


                                <ul className="flex flex-col space-y-4 relative z-10 w-full text-left">
                                    {links.map((link, index) => (
                                        <motion.li
                                            key={link.name}
                                            initial={{ opacity: 0, x: -15, filter: 'blur(10px)' }}
                                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                            transition={{
                                                delay: index * 0.05,
                                                duration: 0.8,
                                                ease: [0.16, 1, 0.3, 1]
                                            }}
                                        >
                                            <button
                                                onClick={() => {
                                                    scrollToSection(link.id);
                                                }}
                                                className={`block w-full text-left text-[15px] font-black tracking-[0.2em] transition-all uppercase ${activeSection === link.id
                                                    ? 'text-ivc-secondary text-glow translate-x-1'
                                                    : 'text-white/70 hover:text-white hover:translate-x-1'
                                                    }`}
                                            >
                                                {link.name}
                                            </button>
                                        </motion.li>
                                    ))}
                                </ul>


                                <div className="mt-8 pt-8 border-t border-white/10 flex flex-col items-center relative z-10">
                                    <img src={logo} className="h-14 w-auto mb-4 opacity-100 brightness-110 contrast-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" alt="" />
                                    <div className="text-[10px] tracking-[0.2em] text-white/90 uppercase font-black text-center whitespace-nowrap">
                                        Ideate . Visualize . Create
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
