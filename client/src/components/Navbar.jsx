import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
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

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isAtTop, setIsAtTop] = useState(true);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); setActiveSection(id); }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY < 100);
            const scrollPos = window.scrollY + 150;
            for (const link of links) {
                const section = document.getElementById(link.id);
                if (section && section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
                    setActiveSection(section.id);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Top VVCE / Inunity Header */}
            <AnimatePresence>
                {isAtTop && (
                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40, transition: { duration: 0.4, ease: "easeInOut" } }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="fixed top-0 left-0 right-0 z-[100] w-full px-4 md:px-8 py-3 md:py-4 flex flex-col md:flex-row items-center justify-center border-b border-white/5 bg-[#050a15]/90 backdrop-blur-md"
                    >
                        <div className="flex items-center gap-3 md:gap-5 max-w-7xl w-full justify-start overflow-hidden py-1">
                            {/* Inunity text - slides from right to left with blur */}
                            <motion.div
                                initial={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                            >
                                <span className="text-white text-lg md:text-2xl font-light tracking-tight" style={{ fontFamily: 'sans-serif' }}>inunity</span>
                            </motion.div>

                            {/* Divider line - expands vertically (no blur) */}
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
                                className="w-[1px] self-stretch min-h-[36px] md:min-h-[48px] bg-white/30"
                            />

                            {/* Logo - slides from left to right with blur */}
                            <motion.img
                                initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                                src={vvceLogo}
                                alt="VVCE"
                                className="h-9 md:h-14 w-auto drop-shadow-md"
                            />

                            {/* Text Info - slides from left to right with blur */}
                            <motion.div
                                initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 0.7 }}
                                className="flex flex-col text-left justify-center flex-shrink"
                            >
                                <span className="text-white/80 text-[6px] md:text-[10px] tracking-widest uppercase mb-0.5 whitespace-nowrap font-medium" style={{ fontFamily: 'sans-serif' }}>Vidyavardhaka Sangha ®, Mysore</span>
                                <span className="text-white font-bold text-[9px] md:text-[18px] leading-none whitespace-nowrap" style={{ fontFamily: 'sans-serif' }}>Vidyavardhaka College of Engineering</span>
                                <span className="text-white/60 text-[6px] md:text-[12px] mt-0.5 whitespace-nowrap font-medium" style={{ fontFamily: 'sans-serif' }}>Autonomous institute affiliated to VTU, Belagavi</span>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scrolling Pill Navbar */}
            <AnimatePresence>
                {!isAtTop && (
                    <motion.nav
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40, transition: { duration: 0.4, ease: "easeInOut" } }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                        className="fixed top-4 md:top-6 left-1/4 -translate-x-1/2 z-[90] pointer-events-auto w-[95vw] md:w-auto max-w-min hidden md:block"
                    >
                        <div className="flex items-center gap-0 md:gap-0.5 bg-[#080d1c]/80 backdrop-blur-2xl border border-white/[0.06] rounded-full px-1 py-1 md:px-1.5 md:py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-x-auto hide-scrollbar">
                            {links.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    className="relative px-2 py-1.5 md:px-4 md:py-2 rounded-full transition-all duration-300"
                                >
                                    {activeSection === link.id && (
                                        <motion.div
                                            layoutId="pill-bg"
                                            className="absolute inset-x-0.5 inset-y-1 bg-white/5 rounded-full"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    {activeSection === link.id && (
                                        <motion.div
                                            layoutId="pill-indicator"
                                            className="absolute -top-1.5 left-1/3 -translate-x-1/2 w-4 md:w-7 h-[4px] md:h-[4px] bg-white rounded-b-xl shadow-[0_0_10px_rgba(34,211,238,1),0_0_30px_rgba(34,211,238,0.6)] z-20"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className={`relative z-10 font-display text-[9px] sm:text-[11px] md:text-[15px] font-bold tracking-wide transition-colors duration-300 whitespace-nowrap ${activeSection === link.id ? 'text-white' : 'text-white/40 hover:text-white/70'
                                        }`}>
                                        {link.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
