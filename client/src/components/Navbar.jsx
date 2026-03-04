import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import logo from '../assets/logo.png';

const links = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Team', id: 'team' },
    { name: 'Events', id: 'events' },
    { name: 'Domains', id: 'domains' },
    { name: 'Projects', id: 'projects' },
    { name: 'Stats', id: 'achievements' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [visible, setVisible] = useState(false);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); setActiveSection(id); }
    };

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 100);
            const scrollPos = window.scrollY + 150;
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
        <>
            {/* Always-visible centered pill navbar */}
            <AnimatePresence>
                {visible && (
                    <motion.nav
                        initial={{ y: -60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -60, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto"
                    >
                        <div className="flex items-center gap-0.5 bg-[#080d1c]/80 backdrop-blur-2xl border border-white/[0.06] rounded-full px-1.5 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                            {links.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    className="relative px-3 md:px-4 py-2 rounded-full transition-all duration-300"
                                >
                                    {activeSection === link.id && (
                                        <motion.div
                                            layoutId="pill-bg"
                                            className="absolute inset-0 bg-cyan-400/10 border border-cyan-400/15 rounded-full"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    {activeSection === link.id && (
                                        <motion.div
                                            layoutId="pill-indicator"
                                            className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className={`relative z-10 font-display text-[9px] md:text-[10px] tracking-[0.12em] uppercase whitespace-nowrap transition-colors duration-300 ${activeSection === link.id ? 'text-cyan-400' : 'text-white/30 hover:text-white/60'
                                        }`}>
                                        {link.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>

            {/* Sidebar Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", stiffness: 400, damping: 40 }}
                            className="fixed top-0 right-0 bottom-0 w-[260px] z-[200] bg-[#080d1c]/95 backdrop-blur-2xl border-l border-white/[0.04] p-8 flex flex-col"
                        >
                            <div className="flex justify-end mb-12">
                                <button onClick={() => setIsOpen(false)} className="w-9 h-9 rounded-lg border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white transition-all">
                                    <X size={16} />
                                </button>
                            </div>
                            <ul className="flex-1 space-y-1">
                                {links.map((link, i) => (
                                    <motion.li key={link.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.03 }}>
                                        <button onClick={() => scrollToSection(link.id)}
                                            className={`w-full text-left py-3 px-4 rounded-xl font-display text-[11px] tracking-[0.2em] uppercase transition-all ${activeSection === link.id ? 'text-cyan-400 bg-cyan-400/5' : 'text-white/25 hover:text-white/50'
                                                }`}>
                                            {link.name}
                                        </button>
                                    </motion.li>
                                ))}
                            </ul>
                            <div className="pt-6 border-t border-white/[0.04] flex flex-col items-center gap-3">
                                <img src={logo} className="h-10 w-auto opacity-30" alt="IVC" />
                                <span className="font-display text-[7px] tracking-[0.4em] text-white/10 uppercase">Ideate · Visualize · Create</span>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
