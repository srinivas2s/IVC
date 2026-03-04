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

const Navbar = ({ isPastHome }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); setActiveSection(id); }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + 100;
            for (const link of links) {
                const section = document.getElementById(link.id);
                if (section && section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
                    setActiveSection(section.id);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[100]">
            {/* TechSolstice-style centered pill navbar when scrolled past home */}
            <AnimatePresence>
                {isPastHome ? (
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-5 left-1/2 -translate-x-1/2 pointer-events-auto"
                    >
                        <div className="flex items-center gap-1 bg-[#0a1020]/80 backdrop-blur-xl border border-white/[0.06] rounded-full px-2 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                            {links.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    className="relative px-4 py-2 rounded-full transition-all duration-300"
                                >
                                    {activeSection === link.id && (
                                        <motion.div
                                            layoutId="pill-active"
                                            className="absolute inset-0 bg-cyan-400/10 border border-cyan-400/20 rounded-full"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <span className={`relative z-10 font-display text-[10px] tracking-[0.15em] uppercase transition-colors ${activeSection === link.id ? 'text-cyan-400' : 'text-white/40 hover:text-white/70'}`}>
                                        {link.name}
                                    </span>
                                    {activeSection === link.id && (
                                        <motion.div
                                            layoutId="pill-dot"
                                            className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    /* Full navbar when at top */
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="absolute top-5 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl pointer-events-auto"
                    >
                        <div className="flex items-center justify-between bg-[#0a1020]/60 backdrop-blur-xl border border-white/[0.06] rounded-2xl px-5 sm:px-8 py-3 sm:py-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                            {/* Left: Branding */}
                            <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                                <span className="text-white font-light text-lg sm:text-2xl tracking-tighter shrink-0">inunity</span>
                                <div className="w-[1px] h-8 sm:h-12 bg-white/10 shrink-0" />
                                <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                                    <img src={vvceLogo} alt="VVCE" className="h-8 sm:h-14 w-auto brightness-110 shrink-0" />
                                    <div className="hidden sm:flex flex-col min-w-0">
                                        <span className="text-[8px] sm:text-[10px] text-white/50 tracking-[0.1em] uppercase truncate">Vidyavardhaka Sangha ®, Mysore</span>
                                        <span className="text-[11px] sm:text-[16px] text-white font-semibold tracking-tight truncate">Vidyavardhaka College of Engineering</span>
                                        <span className="text-[7px] sm:text-[10px] text-white/30 truncate">Autonomous institute affiliated to VTU, Belagavi</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Menu button */}
                            <button
                                onClick={() => setIsOpen(true)}
                                className="flex flex-col gap-1.5 p-2 hover:bg-white/5 rounded-lg transition-colors active:scale-90"
                            >
                                <div className="w-6 h-[2px] bg-white rounded-full" />
                                <div className="w-6 h-[2px] bg-white rounded-full" />
                                <div className="w-6 h-[2px] bg-white rounded-full" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] pointer-events-auto"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", stiffness: 400, damping: 40 }}
                        className="fixed top-0 right-0 bottom-0 w-[280px] z-[200] pointer-events-auto bg-[#080e1e]/95 backdrop-blur-2xl border-l border-white/[0.06] p-8 flex flex-col"
                    >
                        {/* Close */}
                        <div className="flex justify-between items-center mb-12">
                            <span className="font-display text-[8px] tracking-[0.4em] text-white/15 uppercase">Navigation</span>
                            <button onClick={() => setIsOpen(false)} className="w-9 h-9 rounded-lg border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 transition-all">
                                <X size={16} />
                            </button>
                        </div>

                        {/* Links */}
                        <ul className="flex-1 space-y-1">
                            {links.map((link, i) => (
                                <motion.li
                                    key={link.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.03 }}
                                >
                                    <button
                                        onClick={() => scrollToSection(link.id)}
                                        className={`w-full text-left py-3 px-4 rounded-xl font-display text-[11px] tracking-[0.2em] uppercase transition-all ${activeSection === link.id
                                                ? 'text-cyan-400 bg-cyan-400/5 border border-cyan-400/10'
                                                : 'text-white/30 hover:text-white/60 hover:bg-white/[0.02] border border-transparent'
                                            }`}
                                    >
                                        {link.name}
                                    </button>
                                </motion.li>
                            ))}
                        </ul>

                        {/* Bottom branding */}
                        <div className="pt-6 border-t border-white/[0.04] flex flex-col items-center gap-3">
                            <img src={logo} className="h-10 w-auto opacity-40" alt="IVC" />
                            <span className="font-display text-[7px] tracking-[0.4em] text-white/15 uppercase">
                                Ideate · Visualize · Create
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar;
